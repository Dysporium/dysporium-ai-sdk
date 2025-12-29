import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ChatMessage } from '../types'
import { streamChatResponse, validateApiKey } from '../services/openai'
import { createAssistantMessage, updateMessageContent } from '../utils/message'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

interface UseChatMutationOptions {
  modelId: string
  onChunk?: (content: string) => void
  onFinish?: (content: string) => void
  onError?: (error: Error) => void
}

export function useChatMutation(options: UseChatMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ messages, userMessage }: { messages: ChatMessage[]; userMessage: ChatMessage }) => {
      const apiKeyError = validateApiKey(API_KEY)
      if (apiKeyError) {
        throw new Error(apiKeyError)
      }

      const assistantMessage = createAssistantMessage()
      
      queryClient.setQueryData<ChatMessage[]>(['messages'], (old = []) => [
        ...old,
        assistantMessage,
      ])

      let fullContent = ''

      await streamChatResponse({
        apiKey: API_KEY,
        modelId: options.modelId,
        messages: [...messages, userMessage],
        onChunk: (content) => {
          fullContent += content
          queryClient.setQueryData<ChatMessage[]>(['messages'], (old = []) => {
            if (!old) return [assistantMessage]
            return updateMessageContent(old, assistantMessage.id, fullContent)
          })
          options.onChunk?.(content)
        },
        onFinish: (content) => {
          queryClient.setQueryData<ChatMessage[]>(['messages'], (old = []) => {
            if (!old) return [assistantMessage]
            return updateMessageContent(old, assistantMessage.id, content)
          })
          options.onFinish?.(content)
        },
        onError: (error) => {
          queryClient.setQueryData<ChatMessage[]>(['messages'], (old = []) => {
            if (!old) return [assistantMessage]
            return updateMessageContent(old, assistantMessage.id, `Error: ${error.message}`)
          })
          options.onError?.(error)
        },
      })

      return assistantMessage
    },
  })
}

