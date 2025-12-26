import type { GenerateOptions, StreamChunk, ToolCall } from '@dysporium-sdk/provider';
import { anthropicStreamChunkSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { AnthropicRequest } from './types';
import {
  mapMessageToAnthropic,
  mapToolToAnthropic,
  mapToolChoiceToAnthropic,
  mapResponseFormatToAnthropic,
} from './types';

interface ToolCallAccumulator {
  id: string;
  name: string;
  input: Record<string, unknown>;
  partialJson?: string;
}

export async function* streamText(
  modelId: string,
  baseURL: string,
  config: APIClientConfig,
  options: GenerateOptions
): AsyncIterable<StreamChunk> {
  const request: AnthropicRequest = {
    model: modelId,
    messages: options.messages.map(mapMessageToAnthropic),
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature,
    top_p: options.topP,
    top_k: options.topK,
    stop_sequences: options.stopSequences,
    stream: true,
  };

  // Add tools if provided
  if (options.tools && options.tools.length > 0) {
    request.tools = options.tools.map(mapToolToAnthropic);
    if (options.toolChoice) {
      request.tool_choice = mapToolChoiceToAnthropic(options.toolChoice);
    }
  }

  // Add response format warning
  if (options.responseFormat) {
    mapResponseFormatToAnthropic(options.responseFormat);
  }

  // Add user metadata for abuse detection
  if (options.user) {
    request.metadata = { user_id: options.user };
  }

  // Add extended thinking if provided
  if (options.thinking) {
    request.thinking = {
      type: 'enabled',
      budget_tokens: options.thinking.budgetTokens,
    };
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
          if (jsonStr === '[DONE]') continue;

          try {
            const jsonData = JSON.parse(jsonStr);
            const parseResult = anthropicStreamChunkSchema.safeParse(jsonData);

            if (!parseResult.success) {
              console.error('Invalid SSE chunk format:', parseResult.error.message);
              continue;
            }

            const chunk = parseResult.data;

            if (chunk.type === 'message_start') {
              toolCallAccumulators.clear();
              usage = undefined;
              finishReason = undefined;
              continue;
            }

            if (chunk.type === 'content_block_start') {
              const block = chunk.content_block;

              if (block.type === 'tool_use' || (block.id && block.name)) {
                toolCallAccumulators.set(chunk.index, {
                  id: block.id || '',
                  name: block.name || '',
                  input: block.input || {},
                });
              }
              continue;
            }

            if (chunk.type === 'content_block_delta') {
              const delta = chunk.delta;

              if (delta.type === 'text' && delta.text) {
                yield {
                  type: 'text-delta',
                  textDelta: delta.text,
                };
              } else if (delta.type === 'tool_use' && delta.partial_json) {
                const acc = toolCallAccumulators.get(chunk.index);
                if (acc) {
                  acc.partialJson = (acc.partialJson || '') + delta.partial_json;
                  
                  yield {
                    type: 'tool-call-delta',
                    toolCallId: acc.id,
                    toolName: acc.name || undefined,
                    argsTextDelta: delta.partial_json,
                  };
                }
              }
              continue;
            }

            if (chunk.type === 'content_block_stop') {
              const acc = toolCallAccumulators.get(chunk.index);
              if (acc) {
                try {
                  const completeInput = acc.partialJson 
                    ? JSON.parse(acc.partialJson)
                    : acc.input;

                  const toolCall: ToolCall = {
                    id: acc.id,
                    name: acc.name,
                    arguments: completeInput,
                  };

                  yield {
                    type: 'tool-call-complete',
                    toolCall,
                  };
                } catch (e) {
                  console.error('Failed to parse tool call input:', e);
                }
              }
              continue;
            }

            if (chunk.type === 'message_delta') {
              if (chunk.delta.stop_reason !== undefined) {
                finishReason = chunk.delta.stop_reason || undefined;
              }
              if (chunk.usage) {
                usage = {
                  inputTokens: chunk.usage.input_tokens,
                  outputTokens: chunk.usage.output_tokens,
                };
              }
              continue;
            }

            if (chunk.type === 'message_stop') {
              const completedToolCalls: ToolCall[] = [];
              for (const acc of toolCallAccumulators.values()) {
                try {
                  const completeInput = acc.partialJson 
                    ? JSON.parse(acc.partialJson)
                    : acc.input;

                  completedToolCalls.push({
                    id: acc.id,
                    name: acc.name,
                    arguments: completeInput,
                  });
                } catch (e) {
                  console.error('Failed to parse tool call input:', e);
                }
              }

              yield {
                type: 'finish',
                finishReason: finishReason || 'stop',
                usage: usage ? {
                  inputTokens: usage.inputTokens,
                  outputTokens: usage.outputTokens,
                  totalTokens: usage.inputTokens + usage.outputTokens,
                } : undefined,
                toolCalls: completedToolCalls.length > 0 ? completedToolCalls : undefined,
              };
              continue;
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

