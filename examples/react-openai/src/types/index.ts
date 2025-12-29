import type { OpenAIModel } from '@dysporium-sdk/openai'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatState {
  messages: ChatMessage[]
  input: string
  streaming: boolean
  error: string | null
}

export type ModelId = OpenAIModel

export interface ModelOption {
  id: ModelId
  name: string
  description?: string
}
