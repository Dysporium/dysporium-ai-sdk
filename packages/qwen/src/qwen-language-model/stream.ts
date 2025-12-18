import type { GenerateOptions, StreamChunk, ToolCall } from '@dysporium-sdk/provider';
import { qwenStreamChunkSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { QwenRequest } from './types';
import {
  mapMessageToQwen,
  mapToolToQwen,
  mapToolChoiceToQwen,
  mapResponseFormatToQwen,
} from './types';

interface ToolCallAccumulator {
  id: string;
  name: string;
  argumentsText: string;
  index: number;
}

export async function* streamText(
  modelId: string,
  baseURL: string,
  config: APIClientConfig,
  options: GenerateOptions
): AsyncIterable<StreamChunk> {
  const request: QwenRequest = {
    model: modelId,
    messages: options.messages.map(mapMessageToQwen),
    max_tokens: options.maxTokens,
    temperature: options.temperature,
    top_p: options.topP,
    stop: options.stopSequences,
    stream: true,
  };

  if (options.tools && options.tools.length > 0) {
    request.tools = options.tools.map(mapToolToQwen);
    if (options.toolChoice) {
      request.tool_choice = mapToolChoiceToQwen(options.toolChoice);
    }
  }

  if (options.responseFormat) {
    const responseFormat = mapResponseFormatToQwen(options.responseFormat);
    if (responseFormat) {
      request.response_format = responseFormat;
    }
  }

  const response = await makeAPICall(baseURL, config, request);

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const toolCallAccumulators = new Map<number, ToolCallAccumulator>();
  let usage: { inputTokens: number; outputTokens: number } | undefined;
  let finishReason: string | undefined;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // Skip event lines, only process data lines
        if (trimmedLine.startsWith('event:')) continue;

        if (trimmedLine.startsWith('data: ')) {
          const jsonStr = trimmedLine.slice(6);
          if (jsonStr === '[DONE]') {
            // Final chunk - yield finish if we have usage
            if (usage) {
              yield {
                type: 'finish',
                finishReason: finishReason || 'stop',
                usage: {
                  inputTokens: usage.inputTokens,
                  outputTokens: usage.outputTokens,
                  totalTokens: usage.inputTokens + usage.outputTokens,
                },
                toolCalls: Array.from(toolCallAccumulators.values()).map(acc => {
                  try {
                    return {
                      id: acc.id,
                      name: acc.name,
                      arguments: JSON.parse(acc.argumentsText),
                    };
                  } catch (e) {
                    console.error('Failed to parse tool call arguments:', e);
                    return {
                      id: acc.id,
                      name: acc.name,
                      arguments: {},
                    };
                  }
                }),
              };
            }
            continue;
          }

          try {
            const jsonData = JSON.parse(jsonStr);
            const parseResult = qwenStreamChunkSchema.safeParse(jsonData);

            if (!parseResult.success) {
              console.error('Invalid SSE chunk format:', parseResult.error.message);
              continue;
            }

            const chunk = parseResult.data;

            if (!chunk.choices || chunk.choices.length === 0) {
              continue;
            }

            const choice = chunk.choices[0];

            // Handle text deltas
            if (choice.delta.content) {
              yield {
                type: 'text-delta',
                textDelta: choice.delta.content,
              };
            }

            // Handle tool call deltas
            if (choice.delta.tool_calls) {
              for (const toolCallDelta of choice.delta.tool_calls) {
                if (toolCallDelta.index !== undefined) {
                  let acc = toolCallAccumulators.get(toolCallDelta.index);
                  if (!acc) {
                    acc = {
                      id: toolCallDelta.id || '',
                      name: toolCallDelta.function?.name || '',
                      argumentsText: '',
                      index: toolCallDelta.index,
                    };
                    toolCallAccumulators.set(toolCallDelta.index, acc);
                  }

                  if (toolCallDelta.id) {
                    acc.id = toolCallDelta.id;
                  }
                  if (toolCallDelta.function?.name) {
                    acc.name = toolCallDelta.function.name;
                  }
                  if (toolCallDelta.function?.arguments) {
                    acc.argumentsText += toolCallDelta.function.arguments;
                    
                    yield {
                      type: 'tool-call-delta',
                      toolCallId: acc.id,
                      toolName: acc.name || undefined,
                      argsTextDelta: toolCallDelta.function.arguments,
                    };
                  }
                }
              }
            }

            // Handle finish reason
            if (choice.finish_reason !== undefined && choice.finish_reason !== null) {
              finishReason = choice.finish_reason;
            }

            // Handle usage (usually in the last chunk)
            if ('usage' in chunk && chunk.usage) {
              usage = {
                inputTokens: chunk.usage.input_tokens,
                outputTokens: chunk.usage.output_tokens,
              };
            }

            // If we have a finish reason, complete any pending tool calls
            if (choice.finish_reason && toolCallAccumulators.size > 0) {
              const completedToolCalls: ToolCall[] = [];
              for (const acc of toolCallAccumulators.values()) {
                try {
                  completedToolCalls.push({
                    id: acc.id,
                    name: acc.name,
                    arguments: JSON.parse(acc.argumentsText),
                  });

                  yield {
                    type: 'tool-call-complete',
                    toolCall: {
                      id: acc.id,
                      name: acc.name,
                      arguments: JSON.parse(acc.argumentsText),
                    },
                  };
                } catch (e) {
                  console.error('Failed to parse tool call arguments:', e);
                }
              }

              if (usage) {
                yield {
                  type: 'finish',
                  finishReason: finishReason || 'stop',
                  usage: {
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.inputTokens + usage.outputTokens,
                  },
                  toolCalls: completedToolCalls.length > 0 ? completedToolCalls : undefined,
                };
              }
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

