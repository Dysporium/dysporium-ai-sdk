export { generateText } from './generate-text';
export { streamText } from './stream-text';

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
  BaseTextOptions,
  BaseTextResult,
  Usage,
} from './types';

// Re-export provider types for convenience
export type {
  Message,
  LanguageModel,
  Provider,
} from '@dysporium-sdk/provider';