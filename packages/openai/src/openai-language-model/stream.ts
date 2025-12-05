import type { GenerateOptions, StreamChunk, ToolCall } from '@dysporium-sdk/provider';
import { openAIStreamChunkSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { OpenAIRequest } from './types';
import {
  mapMessageToOpenAI,
  mapToolToOpenAI,
  mapToolChoiceToOpenAI,
  mapResponseFormatToOpenAI,
} from './types';

interface ToolCallAccumulator {
  id: string;
  name: string;
  arguments: string;
}

export async function* streamText(
  modelId: string,
  baseURL: string,
  config: APIClientConfig,
  options: GenerateOptions
): AsyncIterable<StreamChunk> {
  const request: OpenAIRequest = {
    model: modelId,
    messages: options.messages.map(mapMessageToOpenAI),
    max_tokens: options.maxTokens,
    temperature: options.temperature,
    top_p: options.topP,
    stop: options.stopSequences,
    stream: true,
    stream_options: { include_usage: true },
  };

  // Add tools if provided
  if (options.tools && options.tools.length > 0) {
    request.tools = options.tools.map(mapToolToOpenAI);
    if (options.toolChoice) {
      request.tool_choice = mapToolChoiceToOpenAI(options.toolChoice);
    }
  }

  // Add response format if provided
  if (options.responseFormat) {
    request.response_format = mapResponseFormatToOpenAI(options.responseFormat);
  }

  const response = await makeAPICall(baseURL, config, request);

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  // Accumulate tool calls as they stream in
  const toolCallAccumulators = new Map<number, ToolCallAccumulator>();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;

        if (trimmedLine.startsWith('data: ')) {
          const jsonStr = trimmedLine.slice(6);
          try {
            const jsonData = JSON.parse(jsonStr);
            const parseResult = openAIStreamChunkSchema.safeParse(jsonData);

            if (!parseResult.success) {
              console.error('Invalid SSE chunk format:', parseResult.error.message);
              continue;
            }

            const chunk = parseResult.data;
            const choice = chunk.choices[0];

            if (!choice) {
              // Handle usage-only chunk (sent at end with empty choices)
              if (chunk.usage) {
                // Build completed tool calls
                const completedToolCalls: ToolCall[] = [];
                for (const acc of toolCallAccumulators.values()) {
                  try {
                    completedToolCalls.push({
                      id: acc.id,
                      name: acc.name,
                      arguments: JSON.parse(acc.arguments),
                    });
                  } catch {
                    // Invalid JSON in tool call arguments
                    console.error('Failed to parse tool call arguments:', acc.arguments);
                  }
                }

                yield {
                  type: 'finish',
                  finishReason: 'stop',
                  usage: {
                    inputTokens: chunk.usage.prompt_tokens,
                    outputTokens: chunk.usage.completion_tokens,
                    totalTokens: chunk.usage.total_tokens,
                  },
                  toolCalls: completedToolCalls.length > 0 ? completedToolCalls : undefined,
                };
              }
              continue;
            }

            // Handle text delta
            if (choice.delta.content) {
              yield {
                type: 'text-delta',
                textDelta: choice.delta.content,
              };
            }

            // Handle tool call deltas
            if (choice.delta.tool_calls) {
              for (const toolCallDelta of choice.delta.tool_calls) {
                const index = toolCallDelta.index;
                
                // Initialize accumulator if this is the first chunk for this tool call
                if (!toolCallAccumulators.has(index)) {
                  toolCallAccumulators.set(index, {
                    id: toolCallDelta.id || '',
                    name: toolCallDelta.function?.name || '',
                    arguments: '',
                  });
                }

                const acc = toolCallAccumulators.get(index)!;

                // Update id and name if provided
                if (toolCallDelta.id) {
                  acc.id = toolCallDelta.id;
                }
                if (toolCallDelta.function?.name) {
                  acc.name = toolCallDelta.function.name;
                }

                // Accumulate arguments
                if (toolCallDelta.function?.arguments) {
                  acc.arguments += toolCallDelta.function.arguments;
                  
                  yield {
                    type: 'tool-call-delta',
                    toolCallId: acc.id,
                    toolName: acc.name || undefined,
                    argsTextDelta: toolCallDelta.function.arguments,
                  };
                }
              }
            }

            // Handle finish reason
            if (choice.finish_reason) {
              // Build completed tool calls
              const completedToolCalls: ToolCall[] = [];
              for (const acc of toolCallAccumulators.values()) {
                try {
                  const toolCall: ToolCall = {
                    id: acc.id,
                    name: acc.name,
                    arguments: acc.arguments ? JSON.parse(acc.arguments) : {},
                  };
                  completedToolCalls.push(toolCall);
                  
                  // Emit tool-call-complete for each tool
                  yield {
                    type: 'tool-call-complete',
                    toolCall,
                  };
                } catch {
                  console.error('Failed to parse tool call arguments:', acc.arguments);
                }
              }

              yield {
                type: 'finish',
                finishReason: choice.finish_reason,
                usage: chunk.usage ? {
                  inputTokens: chunk.usage.prompt_tokens,
                  outputTokens: chunk.usage.completion_tokens,
                  totalTokens: chunk.usage.total_tokens,
                } : undefined,
                toolCalls: completedToolCalls.length > 0 ? completedToolCalls : undefined,
              };
            }
          } catch (e) {
            console.error('Error parsing SSE chunk JSON:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
