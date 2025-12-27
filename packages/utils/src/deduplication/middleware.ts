// ===== Deduplication Middleware =====

import type { DeduplicationConfig } from './types';
import { DeduplicationManager } from './deduplication-manager';

export function createDeduplicationManager(
  config: DeduplicationConfig = {}
): DeduplicationManager {
  return new DeduplicationManager(config);
}

