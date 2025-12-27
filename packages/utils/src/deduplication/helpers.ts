// ===== Deduplication Helpers =====

import type { DeduplicationStats } from './types';

export function formatDeduplicationStats(stats: DeduplicationStats): string {
  const deduplicationRate = stats.totalRequests > 0
    ? ((stats.deduplicatedRequests / stats.totalRequests) * 100).toFixed(1)
    : '0.0';

  return `Deduplication Stats:
  Total Requests: ${stats.totalRequests}
  Deduplicated: ${stats.deduplicatedRequests} (${deduplicationRate}%)
  Executed: ${stats.executedRequests}
  Pending: ${stats.pendingRequests}`;
}

export function isDeduplicationEffective(stats: DeduplicationStats, threshold = 0.1): boolean {
  if (stats.totalRequests === 0) {
    return false;
  }
  const rate = stats.deduplicatedRequests / stats.totalRequests;
  return rate >= threshold;
}

