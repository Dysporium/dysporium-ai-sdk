// ===== Cache Middleware =====

import type { GenerateOptions, GenerateResult } from '@dysporium-sdk/provider';
import type { CacheOptions, ResponseCache } from './types';
import { generateCacheKey } from './key-generator';

export function createCacheMiddleware(cache: ResponseCache, options?: CacheOptions) {
  const keyGenerator = options?.keyGenerator ?? ((opts, modelId) => 
    generateCacheKey(opts, modelId, 'unknown')
  );
  const defaultTtl = options?.ttl;

  return {
    getCached(options: GenerateOptions, modelId: string): GenerateResult | undefined {
      const key = keyGenerator(options, modelId);
      return cache.get(key);
    },

    setCached(
      options: GenerateOptions,
      modelId: string,
      result: GenerateResult,
      ttl?: number
    ): void {
      const key = keyGenerator(options, modelId);
      cache.set(key, result, ttl ?? defaultTtl);
    },

    getKey(options: GenerateOptions, modelId: string): string {
      return keyGenerator(options, modelId);
    },

    cache,
  };
}

