import type { LanguageModel, ToolCall, Logprobs } from '@dysporium-sdk/provider';
import type { BaseTextOptions, BaseTextResult, Usage } from './types';
import { buildMessages } from './utils/messages';

export interface GenerateTextOptions extends BaseTextOptions {
  model: LanguageModel;
}

export interface GenerateTextResult extends BaseTextResult {
  usage: Usage;
  finishReason: string;
  toolCalls?: ToolCall[];
  logprobs?: Logprobs | null;
  systemFingerprint?: string | null;
  serviceTier?: string | null;
}

export async function generateText(
  options: GenerateTextOptions
): Promise<GenerateTextResult> {
  const messages = buildMessages({
    messages: options.messages,
    prompt: options.prompt,
    system: options.system,
  });

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
    provider: options.model.provider,
    model: options.model.modelId,
  };
}

// Helper to parse JSON from structured output
export function parseJSON<T = unknown>(text: string): T {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
