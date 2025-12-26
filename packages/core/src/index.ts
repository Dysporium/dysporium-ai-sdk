export { generateText, parseJSON } from './generate-text';
export { streamText } from './stream-text';
export {
  embed,
  embedMany,
  cosineSimilarity,
  euclideanDistance,
  findSimilar,
} from './embed';

export { DysporiumClient } from './client';

export type {
  GenerateTextOptions,
  GenerateTextResult,
} from './generate-text';

export type {
  StreamTextOptions,
  StreamTextResult,
  TextStreamChunk,
} from './stream-text';

export type {
  EmbedOptions,
  EmbedManyOptions,
  EmbedResult,
  EmbedManyResult,
} from './embed';

export type {
  BaseTextOptions,
  BaseTextResult,
  Usage,
  Tool,
  ToolChoice,
  ToolCall,
  ResponseFormat,
  JsonSchema,
  Logprobs,
} from './types';

// Re-export provider types for convenience
export type {
  Message,
  LanguageModel,
  EmbeddingModel,
  Provider,
  EmbeddingProvider,
  RetryConfig,
  EmbeddingUsage,
  LogprobToken,
} from '@dysporium-sdk/provider';

export { DEFAULT_RETRY_CONFIG } from '@dysporium-sdk/provider';
