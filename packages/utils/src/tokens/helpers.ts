// ===== Token Counting Helpers =====

import type { TokenCountResult, TokenEstimateResult } from './types';

export function formatTokenCount(result: TokenCountResult): string {
  let output = `Total Tokens: ${result.totalTokens}\n`;
  output += `Message Tokens: ${result.messageTokens}`;

  if (result.systemTokens) {
    output += `\nSystem Tokens: ${result.systemTokens}`;
  }

  if (result.toolTokens) {
    output += `\nTool Tokens: ${result.toolTokens}`;
  }

  if (result.messageBreakdown && result.messageBreakdown.length > 0) {
    output += '\n\nMessage Breakdown:';
    for (const msg of result.messageBreakdown) {
      output += `\n  ${msg.role}: ${msg.tokens} tokens`;
    }
  }

  return output;
}

export function formatTokenEstimate(result: TokenEstimateResult): string {
  let output = formatTokenCount(result);

  if (result.estimatedOutputTokens) {
    output += `\n\nEstimated Output Tokens: ${result.estimatedOutputTokens}`;
  }

  if (result.totalEstimatedTokens) {
    output += `\nTotal Estimated Tokens: ${result.totalEstimatedTokens}`;
  }

  return output;
}

export function exceedsTokenLimit(
  result: TokenCountResult | TokenEstimateResult,
  limit: number
): boolean {
  const total = 'totalEstimatedTokens' in result && result.totalEstimatedTokens
    ? result.totalEstimatedTokens
    : result.totalTokens;
  
  return total > limit;
}

export function getTokenUsagePercentage(
  result: TokenCountResult | TokenEstimateResult,
  limit: number
): number {
  const total = 'totalEstimatedTokens' in result && result.totalEstimatedTokens
    ? result.totalEstimatedTokens
    : result.totalTokens;
  
  return Math.min((total / limit) * 100, 100);
}

