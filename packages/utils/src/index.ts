// ===== Hooks / Middleware =====
export {
  // Types
  type RequestContext,
  type ResponseContext,
  type ErrorContext,
  type BeforeRequestHook,
  type AfterResponseHook,
  type OnErrorHook,
  type MiddlewareConfig,

  // Classes
  MiddlewareManager,

  // Built-in hooks
  createLoggingHook,
  createMetricsHook,

  // Helpers
  generateRequestId,
  createRequestContext,
  createResponseContext,
  createErrorContext,
} from './hooks/index';

// ===== Caching =====
export {
  // Types
  type CacheEntry,
  type CacheStats,
  type CacheOptions,
  type ResponseCache,
  type CachedResult,
  type SemanticCacheEntry,
  type SemanticCacheOptions,

  // Classes
  MemoryCache,
  SemanticCache,

  // Functions
  generateCacheKey,
  markAsCached,
  markAsUncached,
  createCacheMiddleware,
} from './cache/index';

// ===== Cost Tracking =====
// Re-export everything from cost.ts (which re-exports from individual modules)
// This maintains backward compatibility while allowing direct imports for tree-shaking
export {
  // Types
  type ModelPricing,
  type CostBreakdown,
  type CostEstimate,
  type CostTrackerEntry,
  type CostSummary,

  // Pricing data
  OPENAI_PRICING,
  ANTHROPIC_PRICING,
  QWEN_PRICING,
  OPENAI_EMBEDDING_PRICING,
  ALL_PRICING,

  // Classes
  CostTracker,

  // Functions
  calculateCost,
  estimateCost,
  calculateEmbeddingCost,
  getModelPricing,
  formatCost,
  formatCostBreakdown,
  formatSummary,
} from './cost/index';

// ===== Request Deduplication =====
export {
  // Types
  type DeduplicationConfig,
  type DeduplicationStats,
  type PendingRequest,

  // Classes
  DeduplicationManager,

  // Functions
  generateDeduplicationKey,
  createDeduplicationManager,
  formatDeduplicationStats,
  isDeduplicationEffective,
} from './deduplication/index';

// ===== Token Counting =====
export {
  // Types
  type TokenCountingMethod,
  type TokenCountOptions,
  type TokenCountResult,
  type EstimateTokensOptions,
  type TokenEstimateResult,

  // Functions
  countTokens,
  countTokensWithTools,
  estimateTokens,
  estimateTokensApproximate,
  estimateTokensOpenAI,
  estimateTokensAnthropic,
  estimateTokensQwen,
  estimateMessageTokens,
  estimateToolTokens,
  formatTokenCount,
  formatTokenEstimate,
  exceedsTokenLimit,
  getTokenUsagePercentage,
} from './tokens/index';

