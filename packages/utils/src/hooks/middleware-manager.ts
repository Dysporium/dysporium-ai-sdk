// ===== Middleware Manager =====

import type {
  BeforeRequestHook,
  AfterResponseHook,
  OnErrorHook,
  MiddlewareConfig,
  RequestContext,
  ResponseContext,
  ErrorContext,
} from './types';

export class MiddlewareManager {
  private beforeRequestHooks: BeforeRequestHook[] = [];
  private afterResponseHooks: AfterResponseHook[] = [];
  private onErrorHooks: OnErrorHook[] = [];

  constructor(config?: MiddlewareConfig) {
    if (config?.beforeRequest) {
      this.beforeRequestHooks = [...config.beforeRequest];
    }
    if (config?.afterResponse) {
      this.afterResponseHooks = [...config.afterResponse];
    }
    if (config?.onError) {
      this.onErrorHooks = [...config.onError];
    }
  }

  use(hook: BeforeRequestHook | AfterResponseHook | OnErrorHook, type: 'beforeRequest' | 'afterResponse' | 'onError'): this {
    switch (type) {
      case 'beforeRequest':
        this.beforeRequestHooks.push(hook as BeforeRequestHook);
        break;
      case 'afterResponse':
        this.afterResponseHooks.push(hook as AfterResponseHook);
        break;
      case 'onError':
        this.onErrorHooks.push(hook as OnErrorHook);
        break;
    }
    return this;
  }

  beforeRequest(hook: BeforeRequestHook): this {
    this.beforeRequestHooks.push(hook);
    return this;
  }

  afterResponse(hook: AfterResponseHook): this {
    this.afterResponseHooks.push(hook);
    return this;
  }

  onError(hook: OnErrorHook): this {
    this.onErrorHooks.push(hook);
    return this;
  }

  async executeBeforeRequest(context: RequestContext): Promise<void> {
    for (const hook of this.beforeRequestHooks) {
      await hook(context);
    }
  }

  async executeAfterResponse(context: ResponseContext): Promise<void> {
    for (const hook of this.afterResponseHooks) {
      await hook(context);
    }
  }

  async executeOnError(context: ErrorContext): Promise<void> {
    for (const hook of this.onErrorHooks) {
      await hook(context);
    }
  }
}

