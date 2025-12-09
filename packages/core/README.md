# @dysporium-sdk/core

Core functionality for Dysporium SDK - a TypeScript library for AI/LLM integration.

## Installation

```bash
npm install @dysporium-sdk/core
# or
pnpm add @dysporium-sdk/core
```

## Features

- **Text Generation** - Generate text completions with any supported LLM
- **Streaming** - Stream text responses in real-time
- **Embeddings** - Generate and compare text embeddings
- **Tool Calling** - Define and use tools/functions with LLMs
- **JSON Parsing** - Structured output parsing from LLM responses

## Usage

### Generate Text

```typescript
import { generateText } from '@dysporium-sdk/core';
import { createOpenAI } from '@dysporium-sdk/openai';

const openai = createOpenAI({ apiKey: 'your-api-key' });

const result = await generateText({
  model: openai('gpt-4'),
  messages: [{ role: 'user', content: 'Hello, world!' }],
});

console.log(result.text);
```

### Stream Text

```typescript
import { streamText } from '@dysporium-sdk/core';

const stream = await streamText({
  model: openai('gpt-4'),
  messages: [{ role: 'user', content: 'Write a short story' }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}
```

### Embeddings

```typescript
import { embed, cosineSimilarity } from '@dysporium-sdk/core';
import { createOpenAIEmbedding } from '@dysporium-sdk/openai';

const embeddingModel = createOpenAIEmbedding({ apiKey: 'your-api-key' });

const result1 = await embed({
  model: embeddingModel('text-embedding-3-small'),
  value: 'Hello world',
});

const result2 = await embed({
  model: embeddingModel('text-embedding-3-small'),
  value: 'Hi there',
});

const similarity = cosineSimilarity(result1.embedding, result2.embedding);
```

## API Reference

### Functions

| Function | Description |
|----------|-------------|
| `generateText` | Generate text completion from a model |
| `streamText` | Stream text completion in real-time |
| `parseJSON` | Parse JSON from model output |
| `embed` | Generate embedding for a single value |
| `embedMany` | Generate embeddings for multiple values |
| `cosineSimilarity` | Calculate cosine similarity between embeddings |
| `euclideanDistance` | Calculate Euclidean distance between embeddings |
| `findSimilar` | Find most similar embeddings |

### Classes

| Class | Description |
|-------|-------------|
| `DysporiumClient` | High-level client for AI operations |

## License

MIT

