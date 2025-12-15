import type { Provider } from '@dysporium-sdk/provider';
import { AnthropicLanguageModel } from './anthropic-language-model/index';
import type { AnthropicConfig } from './types';

export interface AnthropicProvider extends Provider {}

export function createAnthropic(config: AnthropicConfig): AnthropicProvider {
  const provider = (modelId: string) => {
    return new AnthropicLanguageModel(modelId, config);
  };

  provider.languageModel = (modelId: string) => {
    return new AnthropicLanguageModel(modelId, config);
  };

  return provider;
}

