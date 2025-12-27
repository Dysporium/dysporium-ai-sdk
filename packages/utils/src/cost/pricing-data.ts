// ===== Pricing Data =====

import type { ModelPricing } from './cost-calculator';

// ===== OpenAI Pricing (as of Dec 2024) =====

export const OPENAI_PRICING: Record<string, ModelPricing> = {
  // GPT-5.1 Series
  'gpt-5.1': { inputPer1M: 15.00, outputPer1M: 60.00 },
  
  // GPT-5 Series
  'gpt-5': { inputPer1M: 10.00, outputPer1M: 40.00 },
  'gpt-5-mini': { inputPer1M: 3.00, outputPer1M: 12.00 },
  
  // GPT-5.1 Codex
  'gpt-5.1-codex-max': { inputPer1M: 20.00, outputPer1M: 80.00 },
  'gpt-5.1-codex-mini': { inputPer1M: 5.00, outputPer1M: 20.00 },
  
  // GPT-4.1 Series
  'gpt-4.1': { inputPer1M: 2.00, outputPer1M: 8.00 },
  'gpt-4.1-mini': { inputPer1M: 0.40, outputPer1M: 1.60 },
  'gpt-4.1-nano': { inputPer1M: 0.10, outputPer1M: 0.40 },
  
  // GPT-4o Series
  'gpt-4o': { inputPer1M: 2.50, outputPer1M: 10.00, cachedInputPer1M: 1.25 },
  'gpt-4o-mini': { inputPer1M: 0.15, outputPer1M: 0.60, cachedInputPer1M: 0.075 },
  
  // o-series (reasoning)
  'o1': { inputPer1M: 15.00, outputPer1M: 60.00 },
  'o1-preview': { inputPer1M: 15.00, outputPer1M: 60.00 },
  'o1-mini': { inputPer1M: 3.00, outputPer1M: 12.00 },
  'o3': { inputPer1M: 20.00, outputPer1M: 80.00 },
  'o3-mini': { inputPer1M: 4.00, outputPer1M: 16.00 },
  'o4-mini': { inputPer1M: 1.10, outputPer1M: 4.40 },
  
  // Legacy (deprecated)
  'gpt-4-turbo': { inputPer1M: 10.00, outputPer1M: 30.00 },
  'gpt-4': { inputPer1M: 30.00, outputPer1M: 60.00 },
  'gpt-3.5-turbo': { inputPer1M: 0.50, outputPer1M: 1.50 },
};

// ===== Anthropic Pricing (as of Dec 2024) =====

export const ANTHROPIC_PRICING: Record<string, ModelPricing> = {
  // Claude 4.5 Series
  'claude-sonnet-4-5-20250929': { inputPer1M: 3.00, outputPer1M: 15.00, cachedInputPer1M: 0.30 },
  'claude-sonnet-4-5': { inputPer1M: 3.00, outputPer1M: 15.00, cachedInputPer1M: 0.30 },
  'claude-haiku-4-5-20251001': { inputPer1M: 0.80, outputPer1M: 4.00, cachedInputPer1M: 0.08 },
  'claude-haiku-4-5': { inputPer1M: 0.80, outputPer1M: 4.00, cachedInputPer1M: 0.08 },
  'claude-opus-4-5-20251101': { inputPer1M: 15.00, outputPer1M: 75.00, cachedInputPer1M: 1.50 },
  'claude-opus-4-5': { inputPer1M: 15.00, outputPer1M: 75.00, cachedInputPer1M: 1.50 },
  
  // Claude 4 Series
  'claude-opus-4-1-20250805': { inputPer1M: 15.00, outputPer1M: 75.00 },
  'claude-opus-4-1': { inputPer1M: 15.00, outputPer1M: 75.00 },
  'claude-sonnet-4-20250514': { inputPer1M: 3.00, outputPer1M: 15.00 },
  'claude-sonnet-4-0': { inputPer1M: 3.00, outputPer1M: 15.00 },
  'claude-opus-4-20250514': { inputPer1M: 15.00, outputPer1M: 75.00 },
  'claude-opus-4-0': { inputPer1M: 15.00, outputPer1M: 75.00 },
  
  // Claude 3.7
  'claude-3-7-sonnet-20250219': { inputPer1M: 3.00, outputPer1M: 15.00 },
  
  // Claude 3.5
  'claude-3-5-sonnet-20241022': { inputPer1M: 3.00, outputPer1M: 15.00, cachedInputPer1M: 0.30 },
  'claude-3-5-sonnet-20240620': { inputPer1M: 3.00, outputPer1M: 15.00 },
  'claude-3-5-haiku-20241022': { inputPer1M: 0.80, outputPer1M: 4.00, cachedInputPer1M: 0.08 },
  
  // Claude 3 Legacy
  'claude-3-opus-20240229': { inputPer1M: 15.00, outputPer1M: 75.00 },
  'claude-3-sonnet-20240229': { inputPer1M: 3.00, outputPer1M: 15.00 },
  'claude-3-haiku-20240307': { inputPer1M: 0.25, outputPer1M: 1.25, cachedInputPer1M: 0.03 },
};

// ===== Qwen Pricing (Alibaba Cloud, as of Dec 2024) =====
// Note: Prices converted from CNY to USD (approximate)

export const QWEN_PRICING: Record<string, ModelPricing> = {
  // Qwen 3 Series
  'qwen3-235b-a22b-instruct': { inputPer1M: 2.00, outputPer1M: 8.00 },
  'qwen3-32b-instruct': { inputPer1M: 0.50, outputPer1M: 2.00 },
  'qwen3-8b-instruct': { inputPer1M: 0.20, outputPer1M: 0.80 },
  
  // Qwen 2.5 Series
  'qwen2.5-72b-instruct': { inputPer1M: 1.00, outputPer1M: 4.00 },
  'qwen2.5-32b-instruct': { inputPer1M: 0.50, outputPer1M: 2.00 },
  'qwen2.5-14b-instruct': { inputPer1M: 0.30, outputPer1M: 1.20 },
  'qwen2.5-7b-instruct': { inputPer1M: 0.15, outputPer1M: 0.60 },
  'qwen2.5-3b-instruct': { inputPer1M: 0.08, outputPer1M: 0.32 },
  'qwen2.5-1.5b-instruct': { inputPer1M: 0.05, outputPer1M: 0.20 },
  'qwen2.5-0.5b-instruct': { inputPer1M: 0.02, outputPer1M: 0.08 },
  
  // Qwen 2.5 Specialized
  'qwen2.5-coder-32b-instruct': { inputPer1M: 0.60, outputPer1M: 2.40 },
  'qwen2.5-math-72b-instruct': { inputPer1M: 1.20, outputPer1M: 4.80 },
  
  // Qwen 2.0 Series
  'qwen2-72b-instruct': { inputPer1M: 0.80, outputPer1M: 3.20 },
  'qwen2-57b-a14b-instruct': { inputPer1M: 0.60, outputPer1M: 2.40 },
  'qwen2-32b-instruct': { inputPer1M: 0.40, outputPer1M: 1.60 },
  'qwen2-14b-instruct': { inputPer1M: 0.25, outputPer1M: 1.00 },
  'qwen2-7b-instruct': { inputPer1M: 0.12, outputPer1M: 0.48 },
  'qwen2-1.5b-instruct': { inputPer1M: 0.04, outputPer1M: 0.16 },
  'qwen2-0.5b-instruct': { inputPer1M: 0.02, outputPer1M: 0.08 },
};

// ===== OpenAI Embedding Pricing =====

export const OPENAI_EMBEDDING_PRICING: Record<string, number> = {
  'text-embedding-3-small': 0.02, // per 1M tokens
  'text-embedding-3-large': 0.13, // per 1M tokens
  'text-embedding-ada-002': 0.10, // per 1M tokens
};

// ===== Combined Pricing =====

export const ALL_PRICING: Record<string, Record<string, ModelPricing>> = {
  openai: OPENAI_PRICING,
  anthropic: ANTHROPIC_PRICING,
  qwen: QWEN_PRICING,
};

