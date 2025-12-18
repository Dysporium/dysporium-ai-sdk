import type {
  LanguageModel,
  GenerateOptions,
  GenerateResult,
  StreamChunk,
} from '@dysporium-sdk/provider';
import type { QwenConfig } from '../types';
import { generateText } from './generate';
import { streamText } from './stream';
import type { APIClientConfig } from './api-client';

export class QwenLanguageModel implements LanguageModel {
  readonly provider = 'qwen';
  readonly modelId: string;
  private baseURL: string;
  private apiConfig: APIClientConfig;

  constructor(modelId: string, config: QwenConfig) {
    this.modelId = modelId;
    this.baseURL = config.baseURL || 'https://dashscope.aliyuncs.com/api/v1';
    this.apiConfig = {
      apiKey: config.apiKey,
      baseURL: this.baseURL,
      retry: config.retry,
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

