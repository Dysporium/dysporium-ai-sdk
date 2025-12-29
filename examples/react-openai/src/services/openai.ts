import { streamText } from '@dysporium-sdk/core'
import { createOpenAI } from '@dysporium-sdk/openai'
import type { Message } from '@dysporium-sdk/core'
import type { ChatMessage } from '../types'

export interface StreamOptions {
  apiKey: string
  modelId: string
  messages: ChatMessage[]
  onChunk: (content: string) => void
  onFinish: (content: string) => void
  onError: (error: Error) => void
}

export async function streamChatResponse(options: StreamOptions): Promise<void> {
  const { apiKey, modelId, messages, onChunk, onFinish, onError } = options

  try {
    const openai = createOpenAI({ apiKey })
    
    await streamText({
      model: openai(modelId),
      messages: messages.map(m => ({ role: m.role, content: m.content })) as Message[],
      onChunk: (chunk) => {
        if (chunk.type === 'text-delta') {
          onChunk(chunk.textDelta)
        }
      },
      onFinish: (result) => {
        onFinish(result.text || '')
      },
    })
  } catch (err) {
    onError(err instanceof Error ? err : new Error('An error occurred'))
  }
}

export function validateApiKey(apiKey: string | undefined): string | null {
  if (!apiKey || !apiKey.trim()) {
    return 'Please set VITE_OPENAI_API_KEY in your .env file'
  }
  return null
}

