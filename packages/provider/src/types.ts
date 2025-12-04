export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GenerateOptions {
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
  stream?: boolean;
}

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface GenerateResult {
  text: string;
  usage: Usage;
  finishReason: 'stop' | 'length' | 'content_filter' | 'tool_calls' | string;
  raw?: any;
}

export interface StreamChunk {
  type: 'text-delta' | 'finish';
  textDelta?: string;
  finishReason?: string;
  usage?: Usage;
}