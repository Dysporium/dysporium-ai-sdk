// ===== Cache Module Re-exports =====
// Individual modules can be imported directly for better tree-shaking

export type {
  CacheEntry,
  CacheStats,
  CacheOptions,
  ResponseCache,
  CachedResult,
  SemanticCacheEntry,
  SemanticCacheOptions,
} from './types';

export { MemoryCache } from './memory-cache';
export { SemanticCache } from './semantic-cache';

export { generateCacheKey } from './key-generator';
export { markAsCached, markAsUncached } from './helpers';
export { createCacheMiddleware } from './middleware';
