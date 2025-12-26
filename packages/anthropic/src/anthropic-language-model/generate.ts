import type { GenerateOptions, GenerateResult, ToolCall } from '@dysporium-sdk/provider';
import { anthropicResponseSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { AnthropicRequest } from './types';
import {
  mapMessageToAnthropic,
  mapToolToAnthropic,
  mapToolChoiceToAnthropic,
  mapResponseFormatToAnthropic,
} from './types';

export async function generateText(
  modelId: string,
  baseURL: string,
  config: APIClientConfig,
  options: GenerateOptions
): Promise<GenerateResult> {
  const request: AnthropicRequest = {
    model: modelId,
    messages: options.messages.map(mapMessageToAnthropic),
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature,
    top_p: options.topP,
    top_k: options.topK,
    stop_sequences: options.stopSequences,
    stream: false,
  };

  if (options.tools && options.tools.length > 0) {
    request.tools = options.tools.map(mapToolToAnthropic);
    if (options.toolChoice) {
      request.tool_choice = mapToolChoiceToAnthropic(options.toolChoice);
    }
  }

  if (options.responseFormat) {
    mapResponseFormatToAnthropic(options.responseFormat);
  }

  if (options.user) {
    request.metadata = { user_id: options.user };
  }

  if (options.thinking) {
    request.thinking = {
      type: 'enabled',
      budget_tokens: options.thinking.budgetTokens,
    };
  }

  const response = await makeAPICall(baseURL, config, request);
  const jsonData = await response.json();
  const parseResult = anthropicResponseSchema.safeParse(jsonData);

  if (!parseResult.success) {
    throw new Error(
      `Invalid Anthropic API response: ${parseResult.error.message}`
    );
  }

  const data = parseResult.data;

  let text = '';
  const toolCalls: ToolCall[] = [];

  for (const block of data.content) {
    if (block.type === 'text') {
      text += block.text;
    } else if (block.type === 'tool_use') {
      toolCalls.push({
        id: block.id,
        name: block.name,
        arguments: block.input,
      });
    }
  }

  return {
    text,
    usage: {
      inputTokens: data.usage.input_tokens,
      outputTokens: data.usage.output_tokens,
      totalTokens: data.usage.input_tokens + data.usage.output_tokens,
    },
    finishReason: data.stop_reason || 'unknown',
    toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
    raw: data,
  };
}

