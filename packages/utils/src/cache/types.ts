// ===== Cache Type Definitions =====

import type { GenerateOptions, GenerateResult } from '@dysporium-sdk/provider';

// ===== Core Cache Types =====

export interface CacheEntry<T> {
  value: T;
  createdAt: number;
  expiresAt: number | null;
  hits: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
  keyGenerator?: (options: GenerateOptions, modelId: string) => string;
}

// ===== Cache Interface =====

export interface ResponseCache {
  get(key: string): GenerateResult | undefined;
  set(key: string, value: GenerateResult, ttl?: number): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
  stats(): CacheStats;
}

// ===== Cached Result Types =====

export interface CachedResult extends GenerateResult {
  cached: boolean;
  cacheKey?: string;
}

// ===== Semantic Cache Types =====

export interface SemanticCacheEntry {
  key: string;
  embedding: number[];
  result: GenerateResult;
  createdAt: number;
  expiresAt: number | null;
}

export interface SemanticCacheOptions {
  similarityThreshold?: number; // 0-1, default 0.95
  ttl?: number;
  maxSize?: number;
}

