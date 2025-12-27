// ===== Token Counter =====

import type { Message, Tool } from '@dysporium-sdk/provider';
import type { TokenCountOptions, TokenCountResult, EstimateTokensOptions, TokenEstimateResult } from './types';
import { estimateMessageTokens, estimateToolTokens } from './estimators';

export function countTokens(
  messages: Message[],
  options: TokenCountOptions = {}
): TokenCountResult {
  const {
    method = 'approximate',
    includeSystemOverhead = true,
  } = options;

  let messageTokens = 0;
  let systemTokens = 0;
  const messageBreakdown: Array<{ role: string; tokens: number }> = [];

  for (const message of messages) {
    const tokens = estimateMessageTokens(message, method);
    messageTokens += tokens;
    
    messageBreakdown.push({
      role: message.role,
      tokens,
    });

    if (message.role === 'system') {
      systemTokens += tokens;
    }
  }

  if (includeSystemOverhead && systemTokens > 0) {
    systemTokens += 5;
    messageTokens += 5;
  }

  const result: TokenCountResult = {
    totalTokens: messageTokens,
    messageTokens,
    messageBreakdown,
  };

  if (systemTokens > 0) {
    result.systemTokens = systemTokens;
  }

  return result;
}

export function countTokensWithTools(
  messages: Message[],
  tools: Tool[] | undefined,
  options: TokenCountOptions = {}
): TokenCountResult {
  const {
    includeTools = true,
    ...restOptions
  } = options;

  const result = countTokens(messages, restOptions);

  if (includeTools && tools && tools.length > 0) {
    const toolTokens = estimateToolTokens(tools, restOptions.method);
    result.toolTokens = toolTokens;
    result.totalTokens += toolTokens;
  }

  return result;
}

export function estimateTokens(
  messages: Message[],
  tools: Tool[] | undefined,
  options: EstimateTokensOptions = {}
): TokenEstimateResult {
  const {
    includeOutputEstimate = false,
    maxOutputTokens,
    ...countOptions
  } = options;

  const result = countTokensWithTools(messages, tools, countOptions) as TokenEstimateResult;

  if (includeOutputEstimate) {
    const estimatedOutput = maxOutputTokens ?? 500;
    result.estimatedOutputTokens = estimatedOutput;
    result.totalEstimatedTokens = result.totalTokens + estimatedOutput;
  }

  return result;
}

