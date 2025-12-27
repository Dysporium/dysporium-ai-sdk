// ===== Hooks Module Re-exports =====
// Individual modules can be imported directly for better tree-shaking

export type {
  RequestContext,
  ResponseContext,
  ErrorContext,
  BeforeRequestHook,
  AfterResponseHook,
  OnErrorHook,
  MiddlewareConfig,
} from './types';

export { MiddlewareManager } from './middleware-manager';

export { createLoggingHook, createMetricsHook } from './built-in-hooks';

export {
  generateRequestId,
  createRequestContext,
  createResponseContext,
  createErrorContext,
} from './helpers';
