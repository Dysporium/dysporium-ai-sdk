import type { Message, Tool, ToolChoice, ResponseFormat } from '@dysporium-sdk/provider';

// ===== Qwen Message Types =====

export interface QwenMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: QwenToolCall[];
  tool_call_id?: string;
}

export interface QwenToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

// ===== Qwen Tool Types =====

export interface QwenTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, unknown>;
      required?: string[];
    };
  };
}

// ===== Qwen Request =====

export interface QwenRequest {
  model: string;
  messages: QwenMessage[];
  temperature?: number;
  top_p?: number;
  top_k?: number;
  max_tokens?: number;
  stop?: string[];
  stream?: boolean;
  tools?: QwenTool[];
  tool_choice?: 'auto' | 'none' | 'required' | { type: 'function'; function: { name: string } };
  response_format?: { type: 'json_object' | 'text' };

  frequency_penalty?: number;
  presence_penalty?: number;
  repetition_penalty?: number; // Qwen-specific: 1.0 = no penalty
  seed?: number;
  enable_search?: boolean; // Qwen-specific: enable internet search
  parallel_tool_calls?: boolean;
}

// ===== Mapping Functions =====

export function mapMessageToQwen(msg: Message): QwenMessage {
  if (msg.toolCallId) {
    return {
      role: 'tool',
      content: msg.content || '',
      tool_call_id: msg.toolCallId,
    };
  }

  return {
    role: msg.role === 'system' ? 'system' : msg.role === 'assistant' ? 'assistant' : 'user',
    content: msg.content || '',
  };
}

export function mapToolToQwen(tool: Tool): QwenTool {
  return {
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: {
        type: 'object',
        properties: tool.parameters.properties as Record<string, unknown>,
        required: tool.parameters.required,
      },
    },
  };
}

export function mapToolChoiceToQwen(choice: ToolChoice): QwenRequest['tool_choice'] {
  if (typeof choice === 'string') {
    if (choice === 'auto') return 'auto';
    if (choice === 'none') return 'none';
    if (choice === 'required') return 'required';
    return 'auto';
  }
  return {
    type: 'function',
    function: {
      name: choice.name,
    },
  };
}

export function mapResponseFormatToQwen(format: ResponseFormat): QwenRequest['response_format'] | undefined {
  if (format.type === 'json_object') {
    return { type: 'json_object' };
  }
  if (format.type === 'json_schema') {
    // Qwen may support json_schema via tools, but for now return json_object
    return { type: 'json_object' };
  }
  return undefined;
}

