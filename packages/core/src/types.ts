import type {
  LanguageModel,
  Message,
  Tool,
  ToolChoice,
  ToolCall,
  ResponseFormat,
  JsonSchema,
  Logprobs,
} from '@dysporium-sdk/provider';

export interface BaseTextOptions {
  model: LanguageModel;
  messages?: Message[];
  prompt?: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  stopSequences?: string[];

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

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface BaseTextResult {
  text: string;
  provider: string;
  model: string;
  toolCalls?: ToolCall[];
  logprobs?: Logprobs | null;
  systemFingerprint?: string | null;
  serviceTier?: string | null;
}

// Re-export for convenience
export type { Tool, ToolChoice, ToolCall, ResponseFormat, JsonSchema, Logprobs };
