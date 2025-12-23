# @dysporium-sdk/provider

Provider interfaces and types for Dysporium SDK. This package defines the contracts that all AI providers must implement.

## Installation

```bash
npm install @dysporium-sdk/provider
# or
pnpm add @dysporium-sdk/provider
# or
yarn add @dysporium-sdk/provider
```

> **Note:** You typically don't need to install this package directly. It's included as a dependency of `@dysporium-sdk/core` and provider packages like `@dysporium-sdk/openai`.

## Overview

This package provides the foundational types and interfaces for building AI providers. If you're creating a custom provider for a new AI service, you'll implement these interfaces.

## Interfaces

### LanguageModel

The core interface for language models:

```typescript
interface LanguageModel {
  readonly modelId: string;
  readonly provider: string;

  generate(options: GenerateOptions): Promise<GenerateResult>;
  stream(options: GenerateOptions): AsyncIterable<StreamChunk>;
}
```

### EmbeddingModel

Interface for embedding models:

```typescript
interface EmbeddingModel {
  readonly modelId: string;
  readonly provider: string;
  readonly dimensions: number;

  embed(options: EmbeddingOptions): Promise<EmbeddingResult>;
}
```

### Provider

Factory interface for creating model instances:

```typescript
interface Provider<T extends LanguageModel = LanguageModel> {
  (modelId: string): T;
}
```

## Types

### Message

```typescript
type Message = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  toolCallId?: string;
  toolCalls?: ToolCall[];
};
```

### GenerateOptions

```typescript
type GenerateOptions = {
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  responseFormat?: ResponseFormat;
  signal?: AbortSignal;
};
```

### StreamChunk

```typescript
type StreamChunk =
  | TextDeltaChunk
  | ToolCallDeltaChunk
  | ToolCallCompleteChunk
  | FinishChunk;
```

### RetryConfig

```typescript
type RetryConfig = {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
};
```

## Creating a Custom Provider

To create a custom provider, implement the `LanguageModel` interface:

```typescript
import type { LanguageModel, GenerateOptions, GenerateResult, StreamChunk } from '@dysporium-sdk/provider';

class MyCustomModel implements LanguageModel {
  readonly modelId: string;
  readonly provider = 'my-provider';

  constructor(modelId: string) {
    this.modelId = modelId;
  }

  async generate(options: GenerateOptions): Promise<GenerateResult> {
    // Implement generation logic
  }

  async *stream(options: GenerateOptions): AsyncIterable<StreamChunk> {
    // Implement streaming logic
  }
}

// Create a provider factory
export function createMyProvider(config: MyConfig) {
  return (modelId: string) => new MyCustomModel(modelId, config);
}
```

## Exports

### Types

- `Message` - Chat message type
- `GenerateOptions` - Options for text generation
- `GenerateResult` - Result of text generation
- `StreamChunk` - Streaming response chunk types
- `Tool` - Tool/function definition
- `ToolCall` - Tool call from model
- `ToolChoice` - Tool selection strategy
- `ResponseFormat` - Output format specification
- `RetryConfig` - Retry configuration
- `EmbeddingOptions` - Options for embeddings
- `EmbeddingResult` - Result of embedding generation
- `Usage` - Token usage information

### Interfaces

- `LanguageModel` - Language model interface
- `EmbeddingModel` - Embedding model interface
- `Provider` - Provider factory interface
- `EmbeddingProvider` - Embedding provider factory interface

### Constants

- `DEFAULT_RETRY_CONFIG` - Default retry configuration

## License

MIT

