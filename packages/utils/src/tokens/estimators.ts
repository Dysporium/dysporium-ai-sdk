// ===== Token Estimation Methods =====

import type { Message, Tool } from '@dysporium-sdk/provider';

export function estimateTokensApproximate(text: string): number {
  return Math.ceil(text.length / 4);
}

export function estimateTokensOpenAI(text: string): number {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const baseTokens = Math.ceil(words.length * 0.75);
  
  const overhead = Math.ceil(baseTokens * 0.1);
  
  return baseTokens + overhead;
}

export function estimateTokensAnthropic(text: string): number {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const baseTokens = Math.ceil(words.length * 0.8);
  
  const overhead = Math.ceil(baseTokens * 0.05);
  
  return baseTokens + overhead;
}

export function estimateTokensQwen(text: string): number {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const baseTokens = Math.ceil(words.length * 0.7);
  
  const overhead = Math.ceil(baseTokens * 0.08);
  
  return baseTokens + overhead;
}

export function estimateMessageTokens(
  message: Message,
  method: 'approximate' | 'openai' | 'anthropic' | 'qwen' = 'approximate'
): number {
  const content = typeof message.content === 'string' ? message.content : '';
  
  let tokens = 0;
  
  switch (method) {
    case 'openai':
      tokens = estimateTokensOpenAI(content);
      break;
    case 'anthropic':
      tokens = estimateTokensAnthropic(content);
      break;
    case 'qwen':
      tokens = estimateTokensQwen(content);
      break;
    default:
      tokens = estimateTokensApproximate(content);
  }
  
  tokens += 3;
  
  if (message.toolCallId) {
    tokens += 5;
  }
  
  return tokens;
}

export function estimateToolTokens(
  tools: Tool[],
  method: 'approximate' | 'openai' | 'anthropic' | 'qwen' = 'approximate'
): number {
  if (!tools || tools.length === 0) {
    return 0;
  }
  
  let totalTokens = 0;
  
  for (const tool of tools) {
    totalTokens += estimateTokensApproximate(tool.name);
    
    totalTokens += estimateTokensApproximate(tool.description || '');
    
    const paramsJson = JSON.stringify(tool.parameters);
    switch (method) {
      case 'openai':
        totalTokens += estimateTokensOpenAI(paramsJson);
        break;
      case 'anthropic':
        totalTokens += estimateTokensAnthropic(paramsJson);
        break;
      case 'qwen':
        totalTokens += estimateTokensQwen(paramsJson);
        break;
      default:
        totalTokens += estimateTokensApproximate(paramsJson);
    }
    
    totalTokens += 10;
  }
  
  totalTokens += 5;
  
  return totalTokens;
}

