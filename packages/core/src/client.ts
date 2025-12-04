import type { LanguageModel, Provider } from '@dysporium-sdk/provider';
import { generateText, type GenerateTextOptions, type GenerateTextResult } from './generate-text';
import { streamText, type StreamTextOptions, type StreamTextResult } from './stream-text';

export class DysporiumClient {
  constructor(private model: LanguageModel) {}

  getModel(): LanguageModel {
    return this.model;
  }

  setModel(model: LanguageModel): void {
    this.model = model;
  }

  async generate(options: Omit<GenerateTextOptions, 'model'>): Promise<GenerateTextResult> {
    return generateText({
      ...options,
      model: this.model,
    });
  }

  async stream(options: Omit<StreamTextOptions, 'model'>): Promise<StreamTextResult> {
    return streamText({
      ...options,
      model: this.model,
    });
  }

  static fromProvider(provider: Provider, modelId: string): DysporiumClient {
    return new DysporiumClient(provider(modelId));
  }
}

