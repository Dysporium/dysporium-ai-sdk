import type { GenerateOptions, StreamChunk } from '@dysporium-sdk/provider';
import { openAIStreamChunkSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { OpenAIRequest } from './types';
import { mapMessageToOpenAI } from './types';

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
  };

  const response = await makeAPICall(baseURL, config, request);

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

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
              continue;
            }

            if (choice.delta.content) {
              yield {
                type: 'text-delta',
                textDelta: choice.delta.content,
              };
            }

            if (choice.finish_reason) {
              yield {
                type: 'finish',
                finishReason: choice.finish_reason,
                usage: chunk.usage ? {
                  inputTokens: chunk.usage.prompt_tokens,
                  outputTokens: chunk.usage.completion_tokens,
                  totalTokens: chunk.usage.total_tokens,
                } : undefined,
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

