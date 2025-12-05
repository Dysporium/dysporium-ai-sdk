import type { RetryConfig } from '@dysporium-sdk/provider';

export interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  organization?: string;
  retry?: RetryConfig;
}
