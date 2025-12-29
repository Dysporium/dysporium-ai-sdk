import { User, Bot } from 'lucide-react'
import type { ChatMessage } from '../types'

const UserIcon = User as React.ComponentType<{ size?: number; className?: string }>
const BotIcon = Bot as React.ComponentType<{ size?: number; className?: string }>

interface MessageProps {
  message: ChatMessage
  isStreaming: boolean
}

export function Message({ message, isStreaming }: MessageProps) {
  const isUser = message.role === 'user'
  const isEmpty = !message.content && isStreaming && !isUser

  return (
    <div
      className={`flex gap-6 px-8 py-6 ${
        isUser ? 'bg-secondary' : 'bg-secondary'
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded ${
          isUser ? 'bg-secondary' : 'bg-chat-accent'
        } text-white`}
      >
        {isUser ? <UserIcon size={20} /> : <BotIcon size={20} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="leading-7 text-primary whitespace-pre-wrap break-words">
          {isEmpty ? <TypingIndicator /> : message.content}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <span className="inline-flex gap-1 items-center">
      <span className="w-2 h-2 rounded-full bg-secondary animate-bounce delay-[0ms]" />
      <span className="w-2 h-2 rounded-full bg-secondary animate-bounce delay-[150ms]" />
      <span className="w-2 h-2 rounded-full bg-secondary animate-bounce delay-[300ms]" />
    </span>
  )
}

