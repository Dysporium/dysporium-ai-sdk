// ===== Deduplication Exports =====

export type {
  DeduplicationConfig,
  DeduplicationStats,
  PendingRequest,
} from './types';

export { DeduplicationManager } from './deduplication-manager';

export { generateDeduplicationKey } from './key-generator';
export { createDeduplicationManager } from './middleware';
export { formatDeduplicationStats, isDeduplicationEffective } from './helpers';

