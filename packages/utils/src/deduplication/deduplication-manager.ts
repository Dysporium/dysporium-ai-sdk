// ===== Deduplication Manager =====

import type { GenerateOptions } from '@dysporium-sdk/provider';
import type { DeduplicationConfig, DeduplicationStats, PendingRequest } from './types';
import { generateDeduplicationKey } from './key-generator';

export class DeduplicationManager {
  private pendingRequests = new Map<string, PendingRequest<unknown>>();
  private stats: DeduplicationStats = {
    totalRequests: 0,
    deduplicatedRequests: 0,
    executedRequests: 0,
    pendingRequests: 0,
  };
  private config: Required<DeduplicationConfig>;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(config: DeduplicationConfig = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      maxPendingTime: config.maxPendingTime ?? 60000,
      includeNonDeterministic: config.includeNonDeterministic ?? false,
      keyGenerator: config.keyGenerator ?? generateDeduplicationKey,
    };

    if (this.config.enabled) {
      this.startCleanup();
    }
  }

  async execute<T>(
    options: GenerateOptions,
    modelId: string,
    provider: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    if (!this.config.enabled) {
      this.stats.totalRequests++;
      this.stats.executedRequests++;
      return requestFn();
    }

    const key = this.config.keyGenerator(options, modelId, provider);
    this.stats.totalRequests++;

    const existing = this.pendingRequests.get(key);
    if (existing) {
      this.stats.deduplicatedRequests++;
      existing.deduplicationCount++;
      return existing.promise as Promise<T>;
    }

    this.stats.executedRequests++;
    this.stats.pendingRequests++;

    const promise = requestFn()
      .then(result => {
        this.pendingRequests.delete(key);
        this.stats.pendingRequests--;
        return result;
      })
      .catch(error => {
        this.pendingRequests.delete(key);
        this.stats.pendingRequests--;
        throw error;
      });

    const pendingRequest: PendingRequest<T> = {
      promise,
      createdAt: Date.now(),
      deduplicationCount: 0,
    };

    this.pendingRequests.set(key, pendingRequest as PendingRequest<unknown>);

    return promise;
  }

  getStats(): DeduplicationStats {
    return { ...this.stats };
  }

  clear(): void {
    this.pendingRequests.clear();
    this.stats = {
      totalRequests: 0,
      deduplicatedRequests: 0,
      executedRequests: 0,
      pendingRequests: 0,
    };
  }

  updateConfig(config: Partial<DeduplicationConfig>): void {
    const wasEnabled = this.config.enabled;
    this.config = {
      ...this.config,
      ...config,
      keyGenerator: config.keyGenerator ?? this.config.keyGenerator,
    };

    if (this.config.enabled && !wasEnabled) {
      this.startCleanup();
    } else if (!this.config.enabled && wasEnabled) {
      this.stopCleanup();
    }
  }

  private startCleanup(): void {
    if (this.cleanupInterval) {
      return;
    }

    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const keysToDelete: string[] = [];

      for (const [key, request] of this.pendingRequests.entries()) {
        if (now - request.createdAt > this.config.maxPendingTime) {
          keysToDelete.push(key);
        }
      }

      for (const key of keysToDelete) {
        this.pendingRequests.delete(key);
        this.stats.pendingRequests--;
      }
    }, Math.min(this.config.maxPendingTime, 10000)); // Cleanup every 10s or maxPendingTime, whichever is smaller
  }

  private stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
  }

  destroy(): void {
    this.stopCleanup();
    this.clear();
  }
}

