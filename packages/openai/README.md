# @dysporium-sdk/openai

OpenAI provider for Dysporium SDK - integrate OpenAI models with a simple, type-safe API.

## Installation

```bash
npm install @dysporium-sdk/openai
# or
pnpm add @dysporium-sdk/openai
# or
yarn add @dysporium-sdk/openai
```

> **Note:** This package includes all exports from `@dysporium-sdk/core`, so you only need to install this single package.

## Quick Start

```typescript
import { createOpenAI, generateText, streamText } from '@dysporium-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate text
const result = await generateText({
  model: openai('gpt-4'),
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(result.text);
```

## Features

- Full OpenAI API support (GPT-4, GPT-4o, GPT-3.5-turbo, etc.)
- Streaming responses
- Tool/function calling
- JSON mode and structured outputs
- Embeddings (text-embedding-3-small, text-embedding-3-large, etc.)
- Automatic retries with exponential backoff
- Full TypeScript support

## Usage

### Text Generation

```typescript
import { createOpenAI, generateText } from '@dysporium-sdk/openai';

const openai = createOpenAI({ apiKey: 'your-api-key' });

const result = await generateText({
  model: openai('gpt-4o'),
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is the capital of France?' },
  ],
  maxTokens: 100,
  temperature: 0.7,
});

console.log(result.text);
console.log(result.usage); // { promptTokens, completionTokens, totalTokens }
```

### Streaming

```typescript
import { createOpenAI, streamText } from '@dysporium-sdk/openai';

const openai = createOpenAI({ apiKey: 'your-api-key' });

const stream = await streamText({
  model: openai('gpt-4o'),
  messages: [{ role: 'user', content: 'Write a poem about coding' }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}
```

### Tool Calling

```typescript
import { createOpenAI, generateText } from '@dysporium-sdk/openai';

const openai = createOpenAI({ apiKey: 'your-api-key' });

const result = await generateText({
  model: openai('gpt-4o'),
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

### Embeddings

```typescript
import { createOpenAIEmbedding, embed, embedMany, cosineSimilarity } from '@dysporium-sdk/openai';

const embeddingModel = createOpenAIEmbedding({ apiKey: 'your-api-key' });

// Single embedding
const result = await embed({
  model: embeddingModel('text-embedding-3-small'),
  value: 'Hello world',
});

// Multiple embeddings
const results = await embedMany({
  model: embeddingModel('text-embedding-3-small'),
  values: ['Hello', 'World', 'Foo', 'Bar'],
});

// Compare embeddings
const similarity = cosineSimilarity(results.embeddings[0], results.embeddings[1]);
```

## Supported Models

### Language Models

- `gpt-5.1` - Latest model (November 2025)
- `gpt-5` - Advanced reasoning & multimodal (August 2025)
- `gpt-5-mini` - Efficient GPT-5 variant
- `gpt-4.1` - Enhanced GPT-4 (April 2025)
- `gpt-4.1-mini` - Fast and efficient
- `gpt-4.1-nano` - Smallest and fastest
- `gpt-4o` - Multimodal model
- `gpt-4o-mini` - Fast and affordable

### Codex Models (Code-optimized)

- `gpt-5.1-codex-max` - Complex, long-horizon coding tasks
- `gpt-5.1-codex-mini` - Efficient coding assistance

### Embedding Models

- `text-embedding-3-small` - Efficient embeddings
- `text-embedding-3-large` - Higher quality embeddings
- `text-embedding-ada-002` - Legacy model

## Configuration

```typescript
const openai = createOpenAI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.openai.com/v1', // Optional: custom base URL
  organization: 'org-xxx', // Optional: organization ID
  retry: {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 30000,
  },
});
```

## License

MIT

