// ===== Cost Formatting =====

import type { CostBreakdown } from './cost-calculator';
import type { CostSummary } from './cost-tracker';

// ===== Formatting Functions =====

export function formatCost(cost: number, decimals: number = 4): string {
  if (cost < 0.0001) {
    return `$${cost.toExponential(2)}`;
  }
  return `$${cost.toFixed(decimals)}`;
}

export function formatCostBreakdown(breakdown: CostBreakdown): string {
  return `Input: ${formatCost(breakdown.inputCost)} | Output: ${formatCost(breakdown.outputCost)} | Total: ${formatCost(breakdown.totalCost)}`;
}

export function formatSummary(summary: CostSummary): string {
  const lines = [
    `=== Cost Summary ===`,
    `Total Cost: ${formatCost(summary.totalCost)}`,
    `Total Requests: ${summary.totalRequests}`,
    `Total Tokens: ${summary.totalInputTokens.toLocaleString()} input, ${summary.totalOutputTokens.toLocaleString()} output`,
    ``,
    `By Provider:`,
    ...Object.entries(summary.byProvider).map(
      ([provider, data]) => `  ${provider}: ${formatCost(data.cost)} (${data.requests} requests)`
    ),
    ``,
    `By Model:`,
    ...Object.entries(summary.byModel).map(
      ([model, data]) => `  ${model}: ${formatCost(data.cost)} (${data.requests} requests)`
    ),
  ];

  return lines.join('\n');
}

