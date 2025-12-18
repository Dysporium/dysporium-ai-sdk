import type { RetryConfig } from '@dysporium-sdk/provider';

export interface QwenConfig {
  apiKey: string;
  baseURL?: string;
  retry?: RetryConfig;
}

