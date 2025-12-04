import type { Message } from '@dysporium-sdk/provider';

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
  stream?: boolean;
}

export function mapMessageToOpenAI(msg: Message): OpenAIMessage {
  return {
    role: msg.role,
    content: msg.content,
  };
}

