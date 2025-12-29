import type { ChatMessage } from '../types'

export function createUserMessage(content: string): ChatMessage {
  return {
    id: Date.now().toString(),
    role: 'user',
    content: content.trim(),
    timestamp: new Date(),
  }
}

export function createAssistantMessage(): ChatMessage {
  return {
    id: (Date.now() + 1).toString(),
    role: 'assistant',
    content: '',
    timestamp: new Date(),
  }
}

export function updateMessageContent(
  messages: ChatMessage[],
  messageId: string,
  content: string
): ChatMessage[] {
  return messages.map(msg =>
    msg.id === messageId ? { ...msg, content } : msg
  )
}

