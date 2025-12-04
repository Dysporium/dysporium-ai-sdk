import type { GenerateOptions, GenerateResult, StreamChunk } from './types';

export interface LanguageModel {
  readonly provider: string;
  readonly modelId: string;
  
  doGenerate(options: GenerateOptions): Promise<GenerateResult>;
  doStream(options: GenerateOptions): AsyncIterable<StreamChunk>;
}

export interface Provider {
  (modelId: string): LanguageModel;
  languageModel(modelId: string): LanguageModel;
}