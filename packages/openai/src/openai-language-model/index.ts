import type {
  LanguageModel,
  GenerateOptions,
  GenerateResult,
  StreamChunk,
} from '@dysporium-sdk/provider';
import type { OpenAIConfig } from '../types';
import { generateText } from './generate';
import { streamText } from './stream';
import type { APIClientConfig } from './api-client';

export class OpenAILanguageModel implements LanguageModel {
  readonly provider = 'openai';
  readonly modelId: string;
  private baseURL: string;
  private apiConfig: APIClientConfig;

  constructor(modelId: string, config: OpenAIConfig) {
    this.modelId = modelId;
    this.baseURL = config.baseURL || 'https://api.openai.com/v1';
    this.apiConfig = {
      apiKey: config.apiKey,
      baseURL: this.baseURL,
      organization: config.organization,
    };
  }

  async doGenerate(options: GenerateOptions): Promise<GenerateResult> {
    return generateText(
      this.modelId,
      this.baseURL,
      this.apiConfig,
      options
    );
  }

  async *doStream(options: GenerateOptions): AsyncIterable<StreamChunk> {
    yield* streamText(
      this.modelId,
      this.baseURL,
      this.apiConfig,
      options
    );
  }
}

