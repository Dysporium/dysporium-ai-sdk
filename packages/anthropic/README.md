# @dysporium-sdk/anthropic

Anthropic provider for Dysporium SDK - integrate Claude models with a simple, type-safe API.

## Installation

```bash
npm install @dysporium-sdk/anthropic
# or
pnpm add @dysporium-sdk/anthropic
```

> **Note:** This package includes all exports from `@dysporium-sdk/core`, so you only need to install this single package.

## Quick Start

```typescript
import { createAnthropic, generateText, streamText } from '@dysporium-sdk/anthropic';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Generate text
const result = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(result.text);
```

## Features

- Full Anthropic API support (Claude 4.5 Sonnet/Haiku/Opus, Claude 4, Claude 3.7, and legacy models)
- Streaming responses
- Tool/function calling
- Automatic retries with exponential backoff
- Full TypeScript support

## Usage

### Text Generation

```typescript
import { createAnthropic, generateText } from '@dysporium-sdk/anthropic';

const anthropic = createAnthropic({ apiKey: 'your-api-key' });

const result = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  messages: [
    { role: 'user', content: 'What is the capital of France?' },
  ],
  maxTokens: 100,
  temperature: 0.7,
});

console.log(result.text);
console.log(result.usage); // { inputTokens, outputTokens, totalTokens }
```

### Streaming

```typescript
import { createAnthropic, streamText } from '@dysporium-sdk/anthropic';

const anthropic = createAnthropic({ apiKey: 'your-api-key' });

const stream = await streamText({
  model: anthropic('claude-sonnet-4-5'),
  messages: [{ role: 'user', content: 'Write a poem about coding' }],
});

for await (const chunk of stream) {
  if (chunk.type === 'text-delta') {
    process.stdout.write(chunk.textDelta);
  }
}
```

### Tool Calling

```typescript
import { createAnthropic, generateText } from '@dysporium-sdk/anthropic';

const anthropic = createAnthropic({ apiKey: 'your-api-key' });

const result = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  messages: [{ role: 'user', content: 'What is the weather in Paris?' }],
  tools: [
    {
      name: 'get_weather',
      description: 'Get current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name' },
        },
        required: ['location'],
      },
    },
  ],
});

if (result.toolCalls) {
  console.log(result.toolCalls);
}
```

## Supported Models

### Latest Models (Claude 4.5)

- `claude-sonnet-4-5-20250929` / `claude-sonnet-4-5` - Best balance of intelligence, speed, and cost
- `claude-haiku-4-5-20251001` / `claude-haiku-4-5` - Fastest model with near-frontier intelligence
- `claude-opus-4-5-20251101` / `claude-opus-4-5` - Maximum intelligence with practical performance

### Claude 4 Models

- `claude-opus-4-1-20250805` / `claude-opus-4-1` - Enhanced Claude 4.1 Opus
- `claude-sonnet-4-20250514` / `claude-sonnet-4-0` - Claude 4 Sonnet
- `claude-opus-4-20250514` / `claude-opus-4-0` - Claude 4 Opus

### Legacy Models

- `claude-3-7-sonnet-20250219` - Claude 3.7 Sonnet
- `claude-3-5-haiku-20241022` - Claude 3.5 Haiku
- `claude-3-haiku-20240307` - Claude 3 Haiku (fast and efficient)

## Configuration

```typescript
const anthropic = createAnthropic({
  apiKey: 'your-api-key',
  baseURL: 'https://api.anthropic.com/v1', // Optional: custom base URL
  retry: {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 30000,
  },
});
```

## License

MIT

