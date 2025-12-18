# @dysporium-sdk/qwen

Qwen provider for Dysporium SDK - integrate Qwen models with a simple, type-safe API.

## Installation

```bash
npm install @dysporium-sdk/qwen
# or
pnpm add @dysporium-sdk/qwen
```

> **Note:** This package includes all exports from `@dysporium-sdk/core`, so you only need to install this single package.

## Quick Start

```typescript
import { createQwen, generateText, streamText } from '@dysporium-sdk/qwen';

const qwen = createQwen({
  apiKey: process.env.QWEN_API_KEY,
});

// Generate text
const result = await generateText({
  model: qwen('qwen2.5-72b-instruct'),
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(result.text);
```

## Features

- Full Qwen API support (Qwen 2.5, Qwen 2.0, and Qwen 1.5 models)
- Streaming responses
- Tool/function calling
- Automatic retries with exponential backoff
- Full TypeScript support

## Usage

### Text Generation

```typescript
import { createQwen, generateText } from '@dysporium-sdk/qwen';

const qwen = createQwen({ apiKey: 'your-api-key' });

const result = await generateText({
  model: qwen('qwen2.5-72b-instruct'),
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
import { createQwen, streamText } from '@dysporium-sdk/qwen';

const qwen = createQwen({ apiKey: 'your-api-key' });

const stream = await streamText({
  model: qwen('qwen2.5-72b-instruct'),
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
import { createQwen, generateText } from '@dysporium-sdk/qwen';

const qwen = createQwen({ apiKey: 'your-api-key' });

const result = await generateText({
  model: qwen('qwen2.5-72b-instruct'),
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

### Latest Models (Qwen 3 Series)

- `qwen3-235b-a22b-instruct` - Largest model with 235B parameters (22B active), supports ultra-long context up to 1M tokens
- `qwen3-32b-instruct` - High-performance 32B parameter model for complex reasoning
- `qwen3-8b-instruct` - Efficient 8B parameter model

### Qwen 2.5 Models

- `qwen2.5-72b-instruct` - Largest and most capable model
- `qwen2.5-32b-instruct` - High performance model
- `qwen2.5-14b-instruct` - Balanced performance
- `qwen2.5-7b-instruct` - Efficient model
- `qwen2.5-3b-instruct` - Lightweight model
- `qwen2.5-1.5b-instruct` - Ultra-lightweight model
- `qwen2.5-0.5b-instruct` - Minimal model

### Qwen 2.5 Specialized Models

- `qwen2.5-coder-32b-instruct` - Specialized for code generation tasks
- `qwen2.5-math-72b-instruct` - Specialized for mathematical reasoning

### Qwen 2.0 Models

- `qwen2-72b-instruct` - Large model
- `qwen2-57b-a14b-instruct` - Specialized model
- `qwen2-32b-instruct` - High performance
- `qwen2-14b-instruct` - Balanced
- `qwen2-7b-instruct` - Efficient
- `qwen2-1.5b-instruct` - Lightweight
- `qwen2-0.5b-instruct` - Minimal

### Qwen 1.5 Models

- `qwen1.5-72b-chat` - Large chat model
- `qwen1.5-32b-chat` - High performance chat
- `qwen1.5-14b-chat` - Balanced chat
- `qwen1.5-7b-chat` - Efficient chat
- `qwen1.5-4b-chat` - Lightweight chat
- `qwen1.5-1.8b-chat` - Ultra-lightweight chat
- `qwen1.5-0.5b-chat` - Minimal chat

## Configuration

```typescript
const qwen = createQwen({
  apiKey: 'your-api-key',
  baseURL: 'https://dashscope.aliyuncs.com/api/v1', // Optional: custom base URL
  retry: {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 30000,
  },
});
```

## License

MIT

