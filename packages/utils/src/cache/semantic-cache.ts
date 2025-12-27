// ===== Semantic Cache Implementation =====

import type { GenerateResult } from '@dysporium-sdk/provider';
import type { SemanticCacheEntry, SemanticCacheOptions } from './types';

export class SemanticCache {
  private entries: SemanticCacheEntry[] = [];
  private similarityThreshold: number;
  private ttl: number | null;
  private maxSize: number;

  constructor(options?: SemanticCacheOptions) {
    this.similarityThreshold = options?.similarityThreshold ?? 0.95;
    this.ttl = options?.ttl ?? null;
    this.maxSize = options?.maxSize ?? 1000;
  }

  findSimilar(embedding: number[]): GenerateResult | undefined {
    const now = Date.now();

    for (const entry of this.entries) {
      if (entry.expiresAt !== null && now > entry.expiresAt) {
        continue;
      }

      const similarity = this.cosineSimilarity(embedding, entry.embedding);
      if (similarity >= this.similarityThreshold) {
        return entry.result;
      }
    }

    return undefined;
  }

  add(key: string, embedding: number[], result: GenerateResult): void {
    if (this.entries.length >= this.maxSize) {
      this.entries.shift();
    }

    this.entries.push({
      key,
      embedding,
      result,
      createdAt: Date.now(),
      expiresAt: this.ttl ? Date.now() + this.ttl : null,
    });
  }

  clear(): void {
    this.entries = [];
  }

  cleanup(): number {
    const now = Date.now();
    const before = this.entries.length;
    this.entries = this.entries.filter(
      e => e.expiresAt === null || now <= e.expiresAt
    );
    return before - this.entries.length;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      const aVal = a[i]!;
      const bVal = b[i]!;
      dotProduct += aVal * bVal;
      normA += aVal * aVal;
      normB += bVal * bVal;
    }

    const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }
}

