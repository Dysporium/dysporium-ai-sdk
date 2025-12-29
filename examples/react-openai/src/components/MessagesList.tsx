import type { ChatMessage } from '../types'
import { Message } from './Message'

interface MessagesListProps {
  messages: ChatMessage[]
  streaming: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export function MessagesList({ messages, streaming, messagesEndRef }: MessagesListProps) {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} isStreaming={streaming} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

