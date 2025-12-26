import type { Message, Tool, ToolChoice, ResponseFormat } from '@dysporium-sdk/provider';

// ===== OpenAI Message Types =====

export interface OpenAIToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: OpenAIToolCall[];
  tool_call_id?: string;
}

// ===== OpenAI Tool Types =====

export interface OpenAIFunction {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  strict?: boolean;
}

export interface OpenAITool {
  type: 'function';
  function: OpenAIFunction;
}

export type OpenAIToolChoice =
  | 'auto'
  | 'none'
  | 'required'
  | { type: 'function'; function: { name: string } };

// ===== OpenAI Response Format Types =====

export interface OpenAIResponseFormat {
  type: 'text' | 'json_object' | 'json_schema';
  json_schema?: {
    name: string;
    description?: string;
    schema: Record<string, unknown>;
    strict?: boolean;
  };
}

// ===== OpenAI Request =====

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
  stream?: boolean;
  stream_options?: { include_usage: boolean };
  tools?: OpenAITool[];
  tool_choice?: OpenAIToolChoice;
  response_format?: OpenAIResponseFormat;

  frequency_penalty?: number; // -2.0 to 2.0, reduces repetition
  presence_penalty?: number; // -2.0 to 2.0, encourages new topics

  logit_bias?: Record<string, number>;
  logprobs?: boolean;
  top_logprobs?: number;
  n?: number;
  seed?: number;
  user?: string;

  parallel_tool_calls?: boolean; // Allow parallel function execution

  service_tier?: 'auto' | 'default'; // Priority access tier
  store?: boolean; // Store completion for model improvement
  metadata?: Record<string, string>; // Custom metadata for stored completions

  reasoning_effort?: 'low' | 'medium' | 'high';
  max_completion_tokens?: number; // Used instead of max_tokens for o-series

  // Predicted outputs
  prediction?: {
    type: 'content';
    content: string | Array<{ type: 'text'; text: string }>;
  };
}

// ===== Mapping Functions =====

export function mapMessageToOpenAI(msg: Message): OpenAIMessage {
  return {
    role: msg.role,
    content: msg.content,
    tool_call_id: msg.toolCallId,
  };
}

export function mapToolToOpenAI(tool: Tool): OpenAITool {
  return {
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  };
}

export function mapToolChoiceToOpenAI(choice: ToolChoice): OpenAIToolChoice {
  if (typeof choice === 'string') {
    return choice;
  }
  return {
    type: 'function',
    function: { name: choice.name },
  };
}

export function mapResponseFormatToOpenAI(format: ResponseFormat): OpenAIResponseFormat {
  if (format.type === 'text' || format.type === 'json_object') {
    return { type: format.type };
  }
  return {
    type: 'json_schema',
    json_schema: {
      name: format.jsonSchema.name,
      description: format.jsonSchema.description,
      schema: format.jsonSchema.schema,
      strict: format.jsonSchema.strict,
    },
  };
}
