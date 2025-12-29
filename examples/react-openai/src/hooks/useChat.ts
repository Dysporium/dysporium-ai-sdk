import { useState, useRef, useEffect, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ChatMessage } from '../types'
import { createUserMessage } from '../utils/message'
import { useChatMutation } from './useChatMutation'
import { useModel } from './useModel'

export function useChat() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ['messages'],
    initialData: [],
  })

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const { model } = useModel()
  
  const mutation = useChatMutation({
    modelId: model,
    onError: (error) => {
      setError(error.message)
    },
  })

  const sendMessage = useCallback(async () => {
    if (!input.trim() || mutation.isPending) return

    const userMessage = createUserMessage(input)
    
    queryClient.setQueryData<ChatMessage[]>(['messages'], (old = []) => [
      ...old,
      userMessage,
    ])

    setInput('')
    setError(null)

    mutation.mutate(
      { messages, userMessage },
      {
        onError: (error: Error) => {
          setError(error.message)
        },
      }
    )
  }, [input, messages, mutation, queryClient])

  const setInputValue = useCallback((value: string) => {
    setInput(value)
  }, [])

  const clearChat = useCallback(() => {
    queryClient.setQueryData<ChatMessage[]>(['messages'], [])
    setInput('')
    setError(null)
  }, [queryClient])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    messages,
    input,
    streaming: mutation.isPending,
    error,
    messagesEndRef,
    sendMessage,
    setInput: setInputValue,
    clearChat,
    clearError,
  }
}
