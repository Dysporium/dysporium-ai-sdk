// ===== Cost Calculation Logic =====

import type { Usage } from '@dysporium-sdk/provider';
import { ALL_PRICING, OPENAI_EMBEDDING_PRICING } from './pricing-data';

// ===== Types =====

export interface ModelPricing {
  inputPer1M: number; // Cost per 1M input tokens in USD
  outputPer1M: number; // Cost per 1M output tokens in USD
  cachedInputPer1M?: number; // Cost per 1M cached input tokens (if supported)
}

export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: 'USD';
}

export interface CostEstimate extends CostBreakdown {
  model: string;
  provider: string;
  usage: Usage;
}

// ===== Cost Calculation Functions =====

export function calculateCost(
  usage: Usage,
  model: string,
  provider: string = 'openai'
): CostBreakdown {
  const pricing = ALL_PRICING[provider]?.[model];

  if (!pricing) {
    console.warn(`No pricing found for ${provider}/${model}, returning zero cost`);
    return {
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
      currency: 'USD',
    };
  }

  const inputCost = (usage.inputTokens / 1_000_000) * pricing.inputPer1M;
  const outputCost = (usage.outputTokens / 1_000_000) * pricing.outputPer1M;

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    currency: 'USD',
  };
}

export function estimateCost(
  inputTokens: number,
  outputTokens: number,
  model: string,
  provider: string = 'openai'
): CostBreakdown {
  return calculateCost(
    { inputTokens, outputTokens, totalTokens: inputTokens + outputTokens },
    model,
    provider
  );
}

export function calculateEmbeddingCost(
  tokens: number,
  model: string = 'text-embedding-3-small'
): number {
  const pricePerMillion = OPENAI_EMBEDDING_PRICING[model] ?? 0.02;
  return (tokens / 1_000_000) * pricePerMillion;
}

export function getModelPricing(
  model: string,
  provider: string = 'openai'
): ModelPricing | undefined {
  return ALL_PRICING[provider]?.[model];
}

