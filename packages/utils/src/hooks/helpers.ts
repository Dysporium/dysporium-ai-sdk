// ===== Hook Helper Functions =====

import type { GenerateOptions } from '@dysporium-sdk/provider';
import type { RequestContext, ResponseContext, ErrorContext } from './types';
import type { GenerateResult } from '@dysporium-sdk/provider';

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createRequestContext(
  modelId: string,
  provider: string,
  options: GenerateOptions
): RequestContext {
  return {
    modelId,
    provider,
    options,
    timestamp: Date.now(),
    requestId: generateRequestId(),
  };
}

export function createResponseContext(
  modelId: string,
  provider: string,
  result: GenerateResult,
  requestContext: RequestContext
): ResponseContext {
  return {
    modelId,
    provider,
    result,
    requestContext,
    duration: Date.now() - requestContext.timestamp,
    timestamp: Date.now(),
  };
}

export function createErrorContext(
  modelId: string,
  provider: string,
  error: Error,
  requestContext: RequestContext
): ErrorContext {
  return {
    modelId,
    provider,
    error,
    requestContext,
    timestamp: Date.now(),
  };
}

