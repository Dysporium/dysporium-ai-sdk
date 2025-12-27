// ===== In-Memory Cache Implementation =====

import type { GenerateResult } from '@dysporium-sdk/provider';
import type { CacheEntry, CacheStats, ResponseCache } from './types';

export class MemoryCache implements ResponseCache {
  private cache = new Map<string, CacheEntry<GenerateResult>>();
  private hits = 0;
  private misses = 0;
  private maxSize: number;
  private defaultTtl: number | null;

  constructor(options?: { maxSize?: number; ttl?: number }) {
    this.maxSize = options?.maxSize ?? 1000;
    this.defaultTtl = options?.ttl ?? null;
  }

  get(key: string): GenerateResult | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return undefined;
    }

    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return undefined;
    }

    entry.hits++;
    this.hits++;
    return entry.value;
  }

  set(key: string, value: GenerateResult, ttl?: number): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }

    const effectiveTtl = ttl ?? this.defaultTtl;
    const entry: CacheEntry<GenerateResult> = {
      value,
      createdAt: Date.now(),
      expiresAt: effectiveTtl ? Date.now() + effectiveTtl : null,
      hits: 0,
    };

    this.cache.set(key, entry);
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  stats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }

  cleanup(): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt !== null && now > entry.expiresAt) {
        this.cache.delete(key);
        removed++;
      }
    }

    return removed;
  }

  private evictOldest(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }
}

