/// <reference lib="dom" />
import { anthropicErrorSchema } from '../schemas';
import type { AnthropicRequest } from './types';
import type { RetryConfig } from '@dysporium-sdk/provider';
import { DEFAULT_RETRY_CONFIG } from '@dysporium-sdk/provider';

export interface APIClientConfig {
  apiKey: string;
  baseURL: string;
  retry?: RetryConfig;
}

export function buildHeaders(config: APIClientConfig): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'x-api-key': config.apiKey,
    'anthropic-version': '2023-06-01',
  };
}

export class APIError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class RateLimitError extends APIError {
  constructor(
    message: string,
    public readonly retryAfterMs?: number
  ) {
    super(message, 429, 'rate_limit_exceeded', true);
    this.name = 'RateLimitError';
  }
}

async function parseErrorResponse(response: Response): Promise<APIError> {
  const errorBody = await response.json().catch(() => ({}));
  const errorResult = anthropicErrorSchema.safeParse(errorBody);
  const errorMessage = errorResult.success
    ? errorResult.data.error.message
    : JSON.stringify(errorBody);
  const errorCode = errorResult.success ? errorResult.data.error.type ?? undefined : undefined;

  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after');
    const retryAfterMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : undefined;
    return new RateLimitError(
      `Rate limited: ${errorMessage}`,
      retryAfterMs
    );
  }

  const retryableStatusCodes = [429, 500, 502, 503, 504];
  const isRetryable = retryableStatusCodes.includes(response.status);

  return new APIError(
    `Anthropic API error: ${response.status} - ${errorMessage}`,
    response.status,
    errorCode,
    isRetryable
  );
}

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

export async function makeAPICall(
  baseURL: string,
  config: APIClientConfig,
  request: AnthropicRequest
): Promise<Response> {
  const retryConfig: Required<RetryConfig> = {
    ...DEFAULT_RETRY_CONFIG,
    ...config.retry,
  };

  let lastError: APIError | null = null;

  for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
    try {
      const response = await fetch(`${baseURL}/messages`, {
        method: 'POST',
        headers: buildHeaders(config),
        body: JSON.stringify(request),
      });

      if (response.ok) {
        return response;
      }

      const error = await parseErrorResponse(response);
      lastError = error;

      const shouldRetry =
        error.isRetryable &&
        attempt < retryConfig.maxRetries &&
        retryConfig.retryableStatusCodes.includes(error.status);

      if (!shouldRetry) {
        throw error;
      }

      const retryAfterMs = error instanceof RateLimitError ? error.retryAfterMs : undefined;
      const backoffMs = calculateBackoff(attempt, retryConfig, retryAfterMs);
      
      console.warn(
        `Request failed with status ${error.status}, retrying in ${Math.round(backoffMs)}ms (attempt ${attempt + 1}/${retryConfig.maxRetries})`
      );
      
      await sleep(backoffMs);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      if (attempt < retryConfig.maxRetries) {
        const backoffMs = calculateBackoff(attempt, retryConfig);
        console.warn(
          `Network error, retrying in ${Math.round(backoffMs)}ms (attempt ${attempt + 1}/${retryConfig.maxRetries})`
        );
        await sleep(backoffMs);
        lastError = new APIError(
          error instanceof Error ? error.message : 'Network error',
          0,
          'network_error',
          true
        );
      } else {
        throw new APIError(
          error instanceof Error ? error.message : 'Network error',
          0,
          'network_error',
          false
        );
      }
    }
  }

  throw lastError || new APIError('Max retries exceeded', 0, 'max_retries', false);
}

export async function handleAPIError(response: Response): Promise<never> {
  const error = await parseErrorResponse(response);
  throw error;
}
