import type { RetryConfig } from '@dysporium-sdk/provider';

export interface AnthropicConfig {
  apiKey: string;
  baseURL?: string;
  retry?: RetryConfig;
}

