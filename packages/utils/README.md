# @dysporium-sdk/utils

Utility functions for Dysporium SDK - caching, cost tracking, and middleware.

## Installation

```bash
npm install @dysporium-sdk/utils
```

## Features

- **Request/Response Hooks** - Middleware for logging, metrics, and custom processing
- **Response Caching** - In-memory and semantic caching for LLM responses
- **Cost Tracking** - Track and estimate costs across OpenAI, Anthropic, and Qwen

## Usage

### Request/Response Hooks

```typescript
import { MiddlewareManager, createLoggingHook } from '@dysporium-sdk/utils';

// Create middleware manager with logging
const middleware = new MiddlewareManager(createLoggingHook());

// Add custom hooks
middleware.beforeRequest((ctx) => {
  console.log(`Request ${ctx.requestId} to ${ctx.modelId}`);
});

middleware.afterResponse((ctx) => {
  console.log(`Response in ${ctx.duration}ms, used ${ctx.result.usage.totalTokens} tokens`);
});

middleware.onError((ctx) => {
  console.error(`Error: ${ctx.error.message}`);
});
```

### Response Caching

```typescript
import { MemoryCache, generateCacheKey } from '@dysporium-sdk/utils';

// Create cache with 1 hour TTL
const cache = new MemoryCache({ ttl: 3600000, maxSize: 1000 });

// Check cache before making request
const key = generateCacheKey(options, modelId, provider);
const cached = cache.get(key);

if (cached) {
  return cached;
}

// Make request and cache result
const result = await generateText(options);
cache.set(key, result);

// Get cache stats
console.log(cache.stats()); // { hits, misses, size, hitRate }
```

### Semantic Cache

```typescript
import { SemanticCache } from '@dysporium-sdk/utils';

// Cache responses based on semantic similarity
const cache = new SemanticCache({
  similarityThreshold: 0.95,
  ttl: 3600000,
});

// Find similar cached response
const embedding = await embed({ model, value: prompt });
const cached = cache.findSimilar(embedding);

if (!cached) {
  const result = await generateText(options);
  cache.add(prompt, embedding, result);
}
```

### Cost Tracking

```typescript
import { 
  CostTracker, 
  calculateCost, 
  formatCost,
  formatSummary 
} from '@dysporium-sdk/utils';

// Calculate cost for a single request
const cost = calculateCost(result.usage, 'gpt-4o', 'openai');
console.log(formatCost(cost.totalCost)); // $0.0123

// Track costs over time
const tracker = new CostTracker();

// Track each request
tracker.track(result.usage, 'gpt-4o', 'openai');
tracker.track(result2.usage, 'claude-sonnet-4-5', 'anthropic');

// Get summary
const summary = tracker.getSummary();
console.log(formatSummary(summary));

// Check budget
if (tracker.isBudgetExceeded(10.00)) {
  console.warn('Daily budget exceeded!');
}

// Get cost for last hour
const hourCost = tracker.getCostForPeriod(60);
```

### Pricing Data

```typescript
import { 
  OPENAI_PRICING, 
  ANTHROPIC_PRICING, 
  QWEN_PRICING 
} from '@dysporium-sdk/utils';

// Access pricing for any model
console.log(OPENAI_PRICING['gpt-4o']);
// { inputPer1M: 2.50, outputPer1M: 10.00, cachedInputPer1M: 1.25 }

console.log(ANTHROPIC_PRICING['claude-sonnet-4-5']);
// { inputPer1M: 3.00, outputPer1M: 15.00, cachedInputPer1M: 0.30 }
```

## API Reference

### Hooks

- `MiddlewareManager` - Manage request/response hooks
- `createLoggingHook()` - Built-in logging hook
- `createMetricsHook()` - Built-in metrics collection hook

### Caching

- `MemoryCache` - In-memory LRU cache with TTL
- `SemanticCache` - Similarity-based caching using embeddings
- `generateCacheKey()` - Generate deterministic cache keys
- `createCacheMiddleware()` - Create cache middleware

### Cost Tracking

- `CostTracker` - Track costs over time
- `calculateCost()` - Calculate cost from usage
- `estimateCost()` - Estimate cost from token counts
- `formatCost()` - Format cost as string
- `formatSummary()` - Format cost summary

## License

MIT

