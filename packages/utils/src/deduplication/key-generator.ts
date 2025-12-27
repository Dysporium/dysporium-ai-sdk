// ===== Deduplication Key Generation =====

import type { GenerateOptions } from '@dysporium-sdk/provider';

export function generateDeduplicationKey(
  options: GenerateOptions,
  modelId: string,
  provider: string,
  includeNonDeterministic = false
): string {
  const keyParts: Record<string, unknown> = {
    provider,
    modelId,
    messages: options.messages.map(m => ({
      role: m.role,
      content: m.content,
      toolCallId: m.toolCallId,
    })),
  };

  if (includeNonDeterministic) {
    keyParts.maxTokens = options.maxTokens;
    keyParts.temperature = options.temperature;
    keyParts.topP = options.topP;
    keyParts.topK = options.topK;
    keyParts.seed = options.seed;
    keyParts.stopSequences = options.stopSequences;
    keyParts.responseFormat = options.responseFormat;
    keyParts.tools = options.tools;
    keyParts.toolChoice = options.toolChoice;
    keyParts.frequencyPenalty = options.frequencyPenalty;
    keyParts.presencePenalty = options.presencePenalty;
    keyParts.logitBias = options.logitBias;
    keyParts.reasoningEffort = options.reasoningEffort;
    keyParts.maxCompletionTokens = options.maxCompletionTokens;
    keyParts.thinking = options.thinking;
  } else {
    keyParts.maxTokens = options.maxTokens;
    keyParts.responseFormat = options.responseFormat;
    keyParts.tools = options.tools;
    keyParts.toolChoice = options.toolChoice;
  }

  return hashObject(keyParts);
}

function hashObject(obj: unknown): string {
  const str = JSON.stringify(obj, Object.keys(obj as object).sort());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `dedup_${Math.abs(hash).toString(36)}`;
}

