import type {
  GenerateOptions,
  GenerateResult,
  StreamChunk,
  RetryConfig,
  EmbeddingOptions,
  EmbeddingResult,
} from './types';

export interface LanguageModel {
  readonly provider: string;
  readonly modelId: string;
  
  doGenerate(options: GenerateOptions): Promise<GenerateResult>;
  doStream(options: GenerateOptions): AsyncIterable<StreamChunk>;
}

export interface EmbeddingModel {
  readonly provider: string;
  readonly modelId: string;
  
  doEmbed(options: EmbeddingOptions): Promise<EmbeddingResult>;
}

export interface ProviderConfig {
  retry?: RetryConfig;
}

export interface Provider {
  (modelId: string): LanguageModel;
  languageModel(modelId: string): LanguageModel;
}

export interface EmbeddingProvider {
  (modelId: string): EmbeddingModel;
  embeddingModel(modelId: string): EmbeddingModel;
}
