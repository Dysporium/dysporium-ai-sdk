import type { LanguageModel, ToolCall, Logprobs } from '@dysporium-sdk/provider';
import type { BaseTextOptions, BaseTextResult, Usage } from './types';
import { buildMessages } from './utils/messages';
import { estimateTokens } from '@dysporium-sdk/utils';

export interface GenerateTextOptions extends BaseTextOptions {
  model: LanguageModel;
  estimateTokens?: boolean;
}

export interface GenerateTextResult extends BaseTextResult {
  usage: Usage;
  finishReason: string;
  toolCalls?: ToolCall[];
  logprobs?: Logprobs | null;
  systemFingerprint?: string | null;
  serviceTier?: string | null;
  estimatedTokens?: {
    input: number;
    output?: number;
    total: number;
  };
}

export async function generateText(
  options: GenerateTextOptions
): Promise<GenerateTextResult> {
  const messages = buildMessages({
    messages: options.messages,
    prompt: options.prompt,
    system: options.system,
  });

  let estimatedTokens: GenerateTextResult['estimatedTokens'] | undefined;
  if (options.estimateTokens) {
    const estimate = estimateTokens(
      messages,
      options.tools,
      {
        method: options.model.provider === 'openai' ? 'openai' 
          : options.model.provider === 'anthropic' ? 'anthropic'
          : options.model.provider === 'qwen' ? 'qwen'
          : 'approximate',
        includeOutputEstimate: true,
        maxOutputTokens: options.maxTokens,
      }
    );
    estimatedTokens = {
      input: estimate.totalTokens,
      output: estimate.estimatedOutputTokens,
      total: estimate.totalEstimatedTokens ?? estimate.totalTokens,
    };
  }

  const result = await options.model.doGenerate({
    messages,
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    topP: options.topP,
    topK: options.topK,
    stopSequences: options.stopSequences,
    tools: options.tools,
    toolChoice: options.toolChoice,
    parallelToolCalls: options.parallelToolCalls,
    responseFormat: options.responseFormat,
    frequencyPenalty: options.frequencyPenalty,
    presencePenalty: options.presencePenalty,
    logitBias: options.logitBias,
    logprobs: options.logprobs,
    topLogprobs: options.topLogprobs,
    n: options.n,
    seed: options.seed,
    user: options.user,
    serviceTier: options.serviceTier,
    store: options.store,
    metadata: options.metadata,
    reasoningEffort: options.reasoningEffort,
    maxCompletionTokens: options.maxCompletionTokens,
    prediction: options.prediction,
    thinking: options.thinking,
  });

  return {
    text: result.text,
    usage: result.usage,
    finishReason: result.finishReason,
    toolCalls: result.toolCalls,
    logprobs: result.logprobs,
    systemFingerprint: result.systemFingerprint,
    serviceTier: result.serviceTier,
    estimatedTokens,
    provider: options.model.provider,
    model: options.model.modelId,
  };
}

export function parseJSON<T = unknown>(text: string): T {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
