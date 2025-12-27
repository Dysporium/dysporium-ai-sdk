// ===== Deduplication Types =====

import type { GenerateOptions } from '@dysporium-sdk/provider';

export interface DeduplicationConfig {
  enabled?: boolean;

  maxPendingTime?: number;

  includeNonDeterministic?: boolean;

  keyGenerator?: (options: GenerateOptions, modelId: string, provider: string) => string;
}

export interface DeduplicationStats {
  totalRequests: number;

  deduplicatedRequests: number;

  executedRequests: number;

  pendingRequests: number;
}

export interface PendingRequest<T> {
  promise: Promise<T>;
  createdAt: number;

  deduplicationCount: number;
}

