/// <reference lib="dom" />
import { openAIErrorSchema } from '../schemas';
import type { OpenAIRequest } from './types';

export interface APIClientConfig {
  apiKey: string;
  baseURL: string;
  organization?: string;
}

export function buildHeaders(config: APIClientConfig): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  };

  if (config.organization) {
    headers['OpenAI-Organization'] = config.organization;
  }

  return headers;
}

export async function handleAPIError(response: Response): Promise<never> {
  const errorBody = await response.json().catch(() => ({}));
  const errorResult = openAIErrorSchema.safeParse(errorBody);
  const errorMessage = errorResult.success
    ? errorResult.data.error.message
    : JSON.stringify(errorBody);
  throw new Error(
    `OpenAI API error: ${response.status} - ${errorMessage}`
  );
}

export async function makeAPICall(
  baseURL: string,
  config: APIClientConfig,
  request: OpenAIRequest
): Promise<Response> {
  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: buildHeaders(config),
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    await handleAPIError(response);
  }

  return response;
}

