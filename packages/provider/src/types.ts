// ===== Messages =====

export interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCallId?: string;
}

// ===== Tools =====

export interface ToolParameter {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  enum?: string[];
  items?: ToolParameter;
  properties?: Record<string, ToolParameter>;
  required?: string[];
}

export interface Tool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, ToolParameter>;
    required?: string[];
  };
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export type ToolChoice = 'auto' | 'none' | 'required' | { name: string };

// ===== Response Format =====

export interface JsonSchema {
  name: string;
  description?: string;
  schema: Record<string, unknown>;
  strict?: boolean;
}

export type ResponseFormat =
  | { type: 'text' }
  | { type: 'json_object' }
  | { type: 'json_schema'; jsonSchema: JsonSchema };

// ===== Generate Options =====

export interface GenerateOptions {
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number; // Anthropic: top-k sampling
  stopSequences?: string[];
  stream?: boolean;

  // Tool calling
  tools?: Tool[];
  toolChoice?: ToolChoice;
  parallelToolCalls?: boolean;

  // Structured output
  responseFormat?: ResponseFormat;

  // Diversity controls
  frequencyPenalty?: number;
  presencePenalty?: number;

  // Advanced options
  logitBias?: Record<string, number>;
  logprobs?: boolean;
  topLogprobs?: number;
  n?: number;
  seed?: number;
  user?: string;

  // Service options
  serviceTier?: 'auto' | 'default';
  store?: boolean;
  metadata?: Record<string, string>;

  // OpenAI reasoning models (o1, o3, o4-mini)
  reasoningEffort?: 'low' | 'medium' | 'high';
  maxCompletionTokens?: number;

  // Predicted outputs (OpenAI)
  prediction?: {
    type: 'content';
    content: string | Array<{ type: 'text'; text: string }>;
  };

  // Extended thinking (Anthropic Claude 3.5+)
  thinking?: {
    type: 'enabled';
    budgetTokens: number;
  };
}

// ===== Usage =====

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

// ===== Logprobs =====

export interface LogprobToken {
  token: string;
  logprob: number;
  bytes: number[] | null;
  topLogprobs?: Array<{
    token: string;
    logprob: number;
    bytes: number[] | null;
  }>;
}

export interface Logprobs {
  content: LogprobToken[] | null;
  refusal?: LogprobToken[] | null;
}

// ===== Generate Result =====

export interface GenerateResult {
  text: string;
  usage: Usage;
  finishReason: 'stop' | 'length' | 'content_filter' | 'tool_calls' | string;
  toolCalls?: ToolCall[];
  logprobs?: Logprobs | null;
  systemFingerprint?: string | null;
  serviceTier?: string | null;
  raw?: unknown;
}

// ===== Stream Chunks =====

export interface TextDeltaChunk {
  type: 'text-delta';
  textDelta: string;
}

export interface ToolCallDeltaChunk {
  type: 'tool-call-delta';
  toolCallId: string;
  toolName?: string;
  argsTextDelta: string;
}

export interface ToolCallCompleteChunk {
  type: 'tool-call-complete';
  toolCall: ToolCall;
}

export interface FinishChunk {
  type: 'finish';
  finishReason: string;
  usage?: Usage;
  toolCalls?: ToolCall[];
}

export type StreamChunk =
  | TextDeltaChunk
  | ToolCallDeltaChunk
  | ToolCallCompleteChunk
  | FinishChunk;

// ===== Retry Configuration =====

export interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  retryableStatusCodes?: number[];
}

export const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 60000,
  backoffMultiplier: 2,
  retryableStatusCodes: [429, 500, 502, 503, 504],
};

// ===== Embeddings =====

export interface EmbeddingOptions {
  input: string | string[];
  dimensions?: number;
}

export interface EmbeddingResult {
  embeddings: number[][];
  usage: EmbeddingUsage;
  model: string;
}

export interface EmbeddingUsage {
  totalTokens: number;
}

export interface SingleEmbeddingResult {
  embedding: number[];
  usage: EmbeddingUsage;
  model: string;
}
