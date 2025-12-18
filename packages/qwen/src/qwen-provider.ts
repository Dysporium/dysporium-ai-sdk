import type { Provider } from '@dysporium-sdk/provider';
import { QwenLanguageModel } from './qwen-language-model/index';
import type { QwenConfig } from './types';

export interface QwenProvider extends Provider {}

export function createQwen(config: QwenConfig): QwenProvider {
  const provider = (modelId: string) => {
    return new QwenLanguageModel(modelId, config);
  };

  provider.languageModel = (modelId: string) => {
    return new QwenLanguageModel(modelId, config);
  };

  return provider;
}

