import type { LanguageModel, Message } from '@dysporium-sdk/provider';

export interface BaseTextOptions {
  model: LanguageModel;
  messages?: Message[];
  prompt?: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface BaseTextResult {
  text: string;
  provider: string;
  model: string;
}

