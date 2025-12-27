// ===== Token Counting Types =====

export type TokenCountingMethod = 
  | 'approximate' // Simple approximation (4 chars per token)
  | 'openai' // OpenAI-style estimation
  | 'anthropic' // Anthropic-style estimation
  | 'qwen'; // Qwen-style estimation

export interface TokenCountOptions {
  method?: TokenCountingMethod;
  includeSystemOverhead?: boolean;
  includeTools?: boolean;
}

export interface TokenCountResult {
  totalTokens: number;
  messageTokens: number;
  systemTokens?: number;
  toolTokens?: number;
  messageBreakdown?: Array<{
    role: string;
    tokens: number;
  }>;
}

export interface EstimateTokensOptions extends TokenCountOptions {
  maxOutputTokens?: number;
  includeOutputEstimate?: boolean;
}

export interface TokenEstimateResult extends TokenCountResult {
  estimatedOutputTokens?: number;
  totalEstimatedTokens?: number;
}

