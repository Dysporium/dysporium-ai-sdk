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
  stopSequences?: string[];
  stream?: boolean;
  
  // Tool calling
  tools?: Tool[];
  toolChoice?: ToolChoice;
  
  // Structured output
  responseFormat?: ResponseFormat;
}

// ===== Usage =====

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

// ===== Generate Result =====

export interface GenerateResult {
  text: string;
  usage: Usage;
  finishReason: 'stop' | 'length' | 'content_filter' | 'tool_calls' | string;
  toolCalls?: ToolCall[];
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
