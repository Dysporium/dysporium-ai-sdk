import type { Provider } from '@dysporium-sdk/provider';
import { OpenAILanguageModel } from './openai-language-model/index';
import type { OpenAIConfig } from './types';

export function createOpenAI(config: OpenAIConfig): Provider {
  const provider = (modelId: string) => {
    return new OpenAILanguageModel(modelId, config);
  };

  provider.languageModel = (modelId: string) => {
    return new OpenAILanguageModel(modelId, config);
  };

  return provider;
}