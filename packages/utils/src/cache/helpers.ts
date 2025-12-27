// ===== Cache Helper Functions =====

import type { GenerateResult } from '@dysporium-sdk/provider';
import type { CachedResult } from './types';

export function markAsCached(result: GenerateResult, cacheKey: string): CachedResult {
  return {
    ...result,
    cached: true,
    cacheKey,
  };
}

export function markAsUncached(result: GenerateResult): CachedResult {
  return {
    ...result,
    cached: false,
  };
}

