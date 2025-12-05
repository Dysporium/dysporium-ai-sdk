import type {
  LanguageModel,
  Message,
  Tool,
  ToolChoice,
  ToolCall,
  ResponseFormat,
  JsonSchema,
} from '@dysporium-sdk/provider';

export interface BaseTextOptions {
  model: LanguageModel;
  messages?: Message[];
  prompt?: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
  
  // Tool calling
  tools?: Tool[];
  toolChoice?: ToolChoice;
  
  // Structured output
  responseFormat?: ResponseFormat;
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
}

// Re-export for convenience
export type { Tool, ToolChoice, ToolCall, ResponseFormat, JsonSchema };
