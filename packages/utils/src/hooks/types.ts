// ===== Hook Type Definitions =====

import type { GenerateOptions, GenerateResult } from '@dysporium-sdk/provider';

// ===== Context Types =====

export interface RequestContext {
  modelId: string;
  provider: string;
  options: GenerateOptions;
  timestamp: number;
  requestId: string;
}

export interface ResponseContext {
  modelId: string;
  provider: string;
  result: GenerateResult;
  requestContext: RequestContext;
  duration: number;
  timestamp: number;
}

export interface ErrorContext {
  modelId: string;
  provider: string;
  error: Error;
  requestContext: RequestContext;
  timestamp: number;
}

// ===== Hook Function Types =====

export type BeforeRequestHook = (context: RequestContext) => void | Promise<void>;
export type AfterResponseHook = (context: ResponseContext) => void | Promise<void>;
export type OnErrorHook = (context: ErrorContext) => void | Promise<void>;

// ===== Configuration Types =====

export interface MiddlewareConfig {
  beforeRequest?: BeforeRequestHook[];
  afterResponse?: AfterResponseHook[];
  onError?: OnErrorHook[];
}

