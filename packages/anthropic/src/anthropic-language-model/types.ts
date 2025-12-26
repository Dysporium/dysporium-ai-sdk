import type { Message, Tool, ToolChoice, ResponseFormat } from '@dysporium-sdk/provider';

// ===== Anthropic Message Types =====

export interface AnthropicTextContent {
  type: 'text';
  text: string;
}

export interface AnthropicToolResultContent {
  type: 'tool_result';
  tool_use_id: string;
  content: string;
  is_error?: boolean;
}

export interface AnthropicToolUseContent {
  type: 'tool_use';
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export type AnthropicContent = AnthropicTextContent | AnthropicToolResultContent | AnthropicToolUseContent;

export interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string | AnthropicContent[];
}

// ===== Anthropic Tool Types =====

export interface AnthropicTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

// ===== Anthropic Request =====

export interface AnthropicThinkingConfig {
  type: 'enabled';
  budget_tokens: number;
}

export interface AnthropicRequest {
  model: string;
  max_tokens: number;
  messages: AnthropicMessage[];
  system?: string | Array<{ type: 'text'; text: string; cache_control?: { type: 'ephemeral' } }>;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  stop_sequences?: string[];
  stream?: boolean;
  tools?: AnthropicTool[];
  tool_choice?: 'auto' | 'any' | { type: 'tool'; name: string } | undefined;
  metadata?: {
    user_id?: string;
  };

  // Extended thinking (Claude 3.5+ models)
  thinking?: AnthropicThinkingConfig;
}

// ===== Mapping Functions =====

export function mapMessageToAnthropic(msg: Message): AnthropicMessage {
  if (msg.toolCallId) {
    return {
      role: 'user',
      content: [
        {
          type: 'tool_result',
          tool_use_id: msg.toolCallId,
          content: msg.content,
        },
      ],
    };
  }

  if (msg.role === 'system') {
    return {
      role: 'user',
      content: msg.content || '',
    };
  }

  return {
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    content: msg.content || '',
  };
}

export function mapToolToAnthropic(tool: Tool): AnthropicTool {
  return {
    name: tool.name,
    description: tool.description,
    input_schema: {
      type: 'object',
      properties: tool.parameters.properties as Record<string, unknown>,
      required: tool.parameters.required,
    },
  };
}

export function mapToolChoiceToAnthropic(choice: ToolChoice): AnthropicRequest['tool_choice'] {
  if (typeof choice === 'string') {
    if (choice === 'required') {
      return 'any';
    }
    if (choice === 'auto') {
      return 'auto';
    }
    if (choice === 'none') {
      return undefined;
    }
    return 'auto';
  }
  return {
    type: 'tool',
    name: choice.name,
  };
}

// Note: Anthropic doesn't have a direct response_format equivalent
// JSON mode is handled via system prompts or tool calling
export function mapResponseFormatToAnthropic(format: ResponseFormat): void {
  // Anthropic doesn't support response_format in the same way
  // This would need to be handled via system prompts or tools
  // For now, we'll just ignore it or could throw an error
  if (format.type === 'json_schema') {
    console.warn('Anthropic does not support json_schema response format directly. Consider using tools instead.');
  }
}

