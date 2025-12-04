import type { GenerateOptions, GenerateResult } from '@dysporium-sdk/provider';
import { openAIResponseSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { OpenAIRequest } from './types';
import { mapMessageToOpenAI } from './types';

export async function generateText(
  modelId: string,
  baseURL: string,
  config: APIClientConfig,
  options: GenerateOptions
): Promise<GenerateResult> {
  const request: OpenAIRequest = {
    model: modelId,
    messages: options.messages.map(mapMessageToOpenAI),
    max_tokens: options.maxTokens,
    temperature: options.temperature,
    top_p: options.topP,
    stop: options.stopSequences,
    stream: false,
  };

  const response = await makeAPICall(baseURL, config, request);
  const jsonData = await response.json();
  const parseResult = openAIResponseSchema.safeParse(jsonData);

  if (!parseResult.success) {
    throw new Error(
      `Invalid OpenAI API response: ${parseResult.error.message}`
    );
  }

  const data = parseResult.data;
  const choice = data.choices[0];

  if (!choice) {
    throw new Error('OpenAI API response contains no choices');
  }

  if (!choice.message.content) {
    throw new Error('OpenAI API response contains no message content');
  }

  return {
    text: choice.message.content,
    usage: {
      inputTokens: data.usage.prompt_tokens,
      outputTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    },
    finishReason: choice.finish_reason || 'unknown',
    raw: data,
  };
}

