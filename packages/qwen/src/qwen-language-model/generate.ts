import type { GenerateOptions, GenerateResult, ToolCall } from '@dysporium-sdk/provider';
import { qwenResponseSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { QwenRequest } from './types';
import {
  mapMessageToQwen,
  mapToolToQwen,
  mapToolChoiceToQwen,
  mapResponseFormatToQwen,
} from './types';

export async function generateText(
  modelId: string,
  baseURL: string,
  config: APIClientConfig,
  options: GenerateOptions
): Promise<GenerateResult> {
  const request: QwenRequest = {
    model: modelId,
    messages: options.messages.map(mapMessageToQwen),
    max_tokens: options.maxTokens,
    temperature: options.temperature,
    top_p: options.topP,
    stop: options.stopSequences,
    stream: false,
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
  const jsonData = await response.json();
  const parseResult = qwenResponseSchema.safeParse(jsonData);

  if (!parseResult.success) {
    throw new Error(
      `Invalid Qwen API response: ${parseResult.error.message}`
    );
  }

  const data = parseResult.data;
  const choice = data.choices[0];

  if (!choice) {
    throw new Error('No choices in Qwen API response');
  }

  let text = choice.message.content || '';
  const toolCalls: ToolCall[] = [];

  if (choice.message.tool_calls) {
    for (const toolCall of choice.message.tool_calls) {
      try {
        const args = JSON.parse(toolCall.function.arguments);
        toolCalls.push({
          id: toolCall.id,
          name: toolCall.function.name,
          arguments: args,
        });
      } catch (e) {
        console.error('Failed to parse tool call arguments:', e);
      }
    }
  }

  return {
    text,
    usage: {
      inputTokens: data.usage.input_tokens,
      outputTokens: data.usage.output_tokens,
      totalTokens: data.usage.total_tokens || data.usage.input_tokens + data.usage.output_tokens,
    },
    finishReason: choice.finish_reason || 'unknown',
    toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
    raw: data,
  };
}

