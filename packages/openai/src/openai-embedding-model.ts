import type {
  EmbeddingModel,
  EmbeddingOptions,
  EmbeddingResult,
} from '@dysporium-sdk/provider';
import { z } from 'zod';
import type { OpenAIConfig } from './types';
import type { APIClientConfig } from './openai-language-model/api-client';
import { buildHeaders, APIError } from './openai-language-model/api-client';
import { DEFAULT_RETRY_CONFIG, type RetryConfig } from '@dysporium-sdk/provider';

// ===== Schemas =====

const openAIEmbeddingSchema = z.object({
  object: z.literal('embedding'),
  index: z.number(),
  embedding: z.array(z.number()),
});

const openAIEmbeddingResponseSchema = z.object({
  object: z.literal('list'),
  data: z.array(openAIEmbeddingSchema),
  model: z.string(),
  usage: z.object({
    prompt_tokens: z.number(),
    total_tokens: z.number(),
  }),
});

// ===== Request Types =====

interface OpenAIEmbeddingRequest {
  model: string;
  input: string | string[];
  dimensions?: number;
  encoding_format?: 'float' | 'base64';
}

// ===== Helper Functions =====

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateBackoff(
  attempt: number,
  config: Required<RetryConfig>,
  retryAfterMs?: number
): number {
  if (retryAfterMs) {
    return Math.min(retryAfterMs, config.maxDelayMs);
  }
  const delay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt);
  const jitter = delay * 0.1 * (Math.random() * 2 - 1);
  return Math.min(delay + jitter, config.maxDelayMs);
}

// ===== OpenAI Embedding Model =====

export class OpenAIEmbeddingModel implements EmbeddingModel {
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
      retry: config.retry,
    };
  }

  async doEmbed(options: EmbeddingOptions): Promise<EmbeddingResult> {
    const request: OpenAIEmbeddingRequest = {
      model: this.modelId,
      input: options.input,
      encoding_format: 'float',
    };

    if (options.dimensions !== undefined) {
      request.dimensions = options.dimensions;
    }

    const retryConfig: Required<RetryConfig> = {
      ...DEFAULT_RETRY_CONFIG,
      ...this.apiConfig.retry,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseURL}/embeddings`, {
          method: 'POST',
          headers: buildHeaders(this.apiConfig),
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          const errorMessage = errorBody?.error?.message || JSON.stringify(errorBody);
          
          const shouldRetry =
            retryConfig.retryableStatusCodes.includes(response.status) &&
            attempt < retryConfig.maxRetries;

          if (shouldRetry) {
            const retryAfter = response.headers.get('retry-after');
            const retryAfterMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : undefined;
            const backoffMs = calculateBackoff(attempt, retryConfig, retryAfterMs);
            
            console.warn(
              `Embedding request failed with status ${response.status}, retrying in ${Math.round(backoffMs)}ms (attempt ${attempt + 1}/${retryConfig.maxRetries})`
            );
            
            await sleep(backoffMs);
            continue;
          }

          throw new APIError(
            `OpenAI Embeddings API error: ${response.status} - ${errorMessage}`,
            response.status
          );
        }

        const jsonData = await response.json();
        const parseResult = openAIEmbeddingResponseSchema.safeParse(jsonData);

        if (!parseResult.success) {
          throw new Error(
            `Invalid OpenAI Embeddings API response: ${parseResult.error.message}`
          );
        }

        const data = parseResult.data;

        // Sort by index to ensure correct order
        const sortedData = [...data.data].sort((a, b) => a.index - b.index);

        return {
          embeddings: sortedData.map(d => d.embedding),
          usage: {
            totalTokens: data.usage.total_tokens,
          },
          model: data.model,
        };
      } catch (error) {
        if (error instanceof APIError) {
          throw error;
        }
        
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < retryConfig.maxRetries) {
          const backoffMs = calculateBackoff(attempt, retryConfig);
          console.warn(
            `Network error, retrying in ${Math.round(backoffMs)}ms (attempt ${attempt + 1}/${retryConfig.maxRetries})`
          );
          await sleep(backoffMs);
        }
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }
}

// ===== Available Models =====

export const openaiEmbeddingModels = {
  'text-embedding-3-small': 'text-embedding-3-small',
  'text-embedding-3-large': 'text-embedding-3-large',
  'text-embedding-ada-002': 'text-embedding-ada-002',
} as const;

export type OpenAIEmbeddingModelId = typeof openaiEmbeddingModels[keyof typeof openaiEmbeddingModels];

