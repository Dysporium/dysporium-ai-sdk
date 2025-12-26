import type { GenerateOptions, GenerateResult, ToolCall } from '@dysporium-sdk/provider';
import { openAIResponseSchema } from '../schemas';
import type { APIClientConfig } from './api-client';
import { makeAPICall } from './api-client';
import type { OpenAIRequest } from './types';
import {
  mapMessageToOpenAI,
  mapToolToOpenAI,
  mapToolChoiceToOpenAI,
  mapResponseFormatToOpenAI,
} from './types';

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

  // Add tools if provided
  if (options.tools && options.tools.length > 0) {
    request.tools = options.tools.map(mapToolToOpenAI);
    if (options.toolChoice) {
      request.tool_choice = mapToolChoiceToOpenAI(options.toolChoice);
    }
    if (options.parallelToolCalls !== undefined) {
      request.parallel_tool_calls = options.parallelToolCalls;
    }
  }

  // Add response format if provided
  if (options.responseFormat) {
    request.response_format = mapResponseFormatToOpenAI(options.responseFormat);
  }

  // Diversity controls
  if (options.frequencyPenalty !== undefined) {
    request.frequency_penalty = options.frequencyPenalty;
  }
  if (options.presencePenalty !== undefined) {
    request.presence_penalty = options.presencePenalty;
  }

  // Advanced options
  if (options.logitBias !== undefined) {
    request.logit_bias = options.logitBias;
  }
  if (options.logprobs !== undefined) {
    request.logprobs = options.logprobs;
  }
  if (options.topLogprobs !== undefined) {
    request.top_logprobs = options.topLogprobs;
  }
  if (options.n !== undefined) {
    request.n = options.n;
  }
  if (options.seed !== undefined) {
    request.seed = options.seed;
  }
  if (options.user !== undefined) {
    request.user = options.user;
  }

  // Service options
  if (options.serviceTier !== undefined) {
    request.service_tier = options.serviceTier;
  }
  if (options.store !== undefined) {
    request.store = options.store;
  }
  if (options.metadata !== undefined) {
    request.metadata = options.metadata;
  }

  // Reasoning models
  if (options.reasoningEffort !== undefined) {
    request.reasoning_effort = options.reasoningEffort;
  }
  if (options.maxCompletionTokens !== undefined) {
    request.max_completion_tokens = options.maxCompletionTokens;
  }

  // Predicted outputs
  if (options.prediction !== undefined) {
    request.prediction = options.prediction;
  }

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

  // Parse tool calls if present
  let toolCalls: ToolCall[] | undefined;
  if (choice.message.tool_calls && choice.message.tool_calls.length > 0) {
    toolCalls = choice.message.tool_calls.map(tc => ({
      id: tc.id,
      name: tc.function.name,
      arguments: JSON.parse(tc.function.arguments),
    }));
  }

  // Determine text output
  const text = choice.message.content ?? '';

  // Map logprobs if present
  const logprobs = choice.logprobs
    ? {
        content: choice.logprobs.content?.map(lp => ({
          token: lp.token,
          logprob: lp.logprob,
          bytes: lp.bytes,
          topLogprobs: lp.top_logprobs?.map(tlp => ({
            token: tlp.token,
            logprob: tlp.logprob,
            bytes: tlp.bytes,
          })),
        })) ?? null,
        refusal: choice.logprobs.refusal?.map(lp => ({
          token: lp.token,
          logprob: lp.logprob,
          bytes: lp.bytes,
          topLogprobs: lp.top_logprobs?.map(tlp => ({
            token: tlp.token,
            logprob: tlp.logprob,
            bytes: tlp.bytes,
          })),
        })) ?? null,
      }
    : undefined;

  return {
    text,
    usage: {
      inputTokens: data.usage.prompt_tokens,
      outputTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    },
    finishReason: choice.finish_reason || 'unknown',
    toolCalls,
    logprobs,
    systemFingerprint: data.system_fingerprint,
    serviceTier: data.service_tier,
    raw: data,
  };
}
