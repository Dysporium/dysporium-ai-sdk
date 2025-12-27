// ===== Built-in Hooks =====

import type { MiddlewareConfig } from './types';

export function createLoggingHook(options?: {
  logRequest?: boolean;
  logResponse?: boolean;
  logErrors?: boolean;
  logger?: (message: string, data?: unknown) => void;
}): MiddlewareConfig {
  const {
    logRequest = true,
    logResponse = true,
    logErrors = true,
    logger = console.log,
  } = options ?? {};

  const hooks: MiddlewareConfig = {};

  if (logRequest) {
    hooks.beforeRequest = [
      (ctx) => {
        logger(`[${ctx.requestId}] Request to ${ctx.provider}/${ctx.modelId}`, {
          timestamp: new Date(ctx.timestamp).toISOString(),
          messageCount: ctx.options.messages.length,
        });
      },
    ];
  }

  if (logResponse) {
    hooks.afterResponse = [
      (ctx) => {
        logger(`[${ctx.requestContext.requestId}] Response from ${ctx.provider}/${ctx.modelId}`, {
          duration: `${ctx.duration}ms`,
          usage: ctx.result.usage,
          finishReason: ctx.result.finishReason,
        });
      },
    ];
  }

  if (logErrors) {
    hooks.onError = [
      (ctx) => {
        logger(`[${ctx.requestContext.requestId}] Error from ${ctx.provider}/${ctx.modelId}`, {
          error: ctx.error.message,
        });
      },
    ];
  }

  return hooks;
}

export function createMetricsHook(collector: {
  recordRequest: (provider: string, model: string) => void;
  recordResponse: (provider: string, model: string, duration: number, usage: { inputTokens: number; outputTokens: number; totalTokens: number }) => void;
  recordError: (provider: string, model: string, error: Error) => void;
}): MiddlewareConfig {
  return {
    beforeRequest: [
      (ctx) => {
        collector.recordRequest(ctx.provider, ctx.modelId);
      },
    ],
    afterResponse: [
      (ctx) => {
        collector.recordResponse(
          ctx.provider,
          ctx.modelId,
          ctx.duration,
          ctx.result.usage
        );
      },
    ],
    onError: [
      (ctx) => {
        collector.recordError(ctx.provider, ctx.modelId, ctx.error);
      },
    ],
  };
}

