import type { Provider, EmbeddingProvider } from '@dysporium-sdk/provider';
import { OpenAILanguageModel } from './openai-language-model/index';
import { OpenAIEmbeddingModel } from './openai-embedding-model';
import type { OpenAIConfig } from './types';

export interface OpenAIProvider extends Provider {
  embedding(modelId: string): OpenAIEmbeddingModel;
}

export function createOpenAI(config: OpenAIConfig): OpenAIProvider {
  const provider = (modelId: string) => {
    return new OpenAILanguageModel(modelId, config);
  };

  provider.languageModel = (modelId: string) => {
    return new OpenAILanguageModel(modelId, config);
  };

  provider.embedding = (modelId: string) => {
    return new OpenAIEmbeddingModel(modelId, config);
  };

  return provider;
}

export function createOpenAIEmbedding(config: OpenAIConfig): EmbeddingProvider {
  const provider = (modelId: string) => {
    return new OpenAIEmbeddingModel(modelId, config);
  };

  provider.embeddingModel = (modelId: string) => {
    return new OpenAIEmbeddingModel(modelId, config);
  };

  return provider;
}
