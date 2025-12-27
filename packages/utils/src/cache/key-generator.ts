// ===== Cache Key Generation =====

import type { GenerateOptions } from '@dysporium-sdk/provider';

export function generateCacheKey(
  options: GenerateOptions,
  modelId: string,
  provider: string
): string {
  const keyParts = {
    provider,
    modelId,
    messages: options.messages.map(m => ({ role: m.role, content: m.content })),
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    topP: options.topP,
    topK: options.topK,
    seed: options.seed,
    responseFormat: options.responseFormat,
  };

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
  return `cache_${Math.abs(hash).toString(36)}`;
}

