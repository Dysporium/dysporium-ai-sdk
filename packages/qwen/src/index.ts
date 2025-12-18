// Re-export everything from core for convenience
// just `npm install @dysporium-sdk/qwen` and get everything
export {
  generateText,
  parseJSON,
  streamText,
  embed,
  embedMany,
  cosineSimilarity,
  euclideanDistance,
  findSimilar,
  DysporiumClient,
  DEFAULT_RETRY_CONFIG,
} from '@dysporium-sdk/core';

export type {
  GenerateTextOptions,
  GenerateTextResult,
  StreamTextOptions,
  StreamTextResult,
  TextStreamChunk,
  EmbedOptions,
  EmbedManyOptions,
  EmbedResult,
  EmbedManyResult,
  BaseTextOptions,
  BaseTextResult,
  Usage,
  Tool,
  ToolChoice,
  ToolCall,
  ResponseFormat,
  JsonSchema,
  Message,
  LanguageModel,
  EmbeddingModel,
  Provider,
  EmbeddingProvider,
  RetryConfig,
  EmbeddingUsage,
} from '@dysporium-sdk/core';

// Qwen-specific exports
export { createQwen, type QwenProvider } from './qwen-provider';
export { QwenLanguageModel } from './qwen-language-model/index';
export { qwenModels } from './models';
export { APIError, RateLimitError } from './qwen-language-model/api-client';
export type { QwenConfig } from './types';
export type { QwenModel } from './models';

