// Re-export everything from core for convenience
// just `npm install @dysporium-sdk/openai` and get everything
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

// OpenAI-specific exports
export { createOpenAI, createOpenAIEmbedding, type OpenAIProvider } from './openai-provider';
export { OpenAILanguageModel } from './openai-language-model/index';
export { OpenAIEmbeddingModel, openaiEmbeddingModels } from './openai-embedding-model';
export { openaiModels } from './models';
export { APIError, RateLimitError } from './openai-language-model/api-client';
export type { OpenAIConfig } from './types';
export type { OpenAIModel } from './models';
export type { OpenAIEmbeddingModelId } from './openai-embedding-model';
