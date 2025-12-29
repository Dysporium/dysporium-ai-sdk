import { useRef, useEffect, useState } from 'react'
import { Send, ChevronDown, Plus, File, Image, Mic } from 'lucide-react'
import type { ModelId } from '../types'
import { AVAILABLE_MODELS } from '../constants/models'

const SendIcon = Send as React.ComponentType<{ size?: number; className?: string }>
const ChevronDownIcon = ChevronDown as React.ComponentType<{ size?: number; className?: string }>
const PlusIcon = Plus as React.ComponentType<{ size?: number; className?: string }>
const FileIcon = File as React.ComponentType<{ size?: number; className?: string }>
const ImageIcon = Image as React.ComponentType<{ size?: number; className?: string }>
const MicIcon = Mic as React.ComponentType<{ size?: number; className?: string }>

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled: boolean
  selectedModel: ModelId
  onModelChange: (model: ModelId) => void
  onFileAttach?: () => void
  onImageAttach?: () => void
  onAudioAttach?: () => void
}

export function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  disabled, 
  selectedModel, 
  onModelChange,
  onFileAttach,
  onImageAttach,
  onAudioAttach,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false)
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const selectedModelInfo = AVAILABLE_MODELS.find(m => m.id === selectedModel)

  return (
    <div className="p-4">
      <div className="flex items-end gap-2 rounded-xl p-2 max-w-3xl mx-auto border shadow-xl">
        <div className="relative flex-shrink-0">
          <button
            onClick={() => {
              setAttachmentMenuOpen(!attachmentMenuOpen)
              setModelSelectorOpen(false)
            }}
            className="flex items-center justify-center w-9 h-9 bg-transparent border-none text-secondary cursor-pointer rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Attach file"
          >
            <PlusIcon size={18} />
          </button>

          {attachmentMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/10"
                onClick={() => setAttachmentMenuOpen(false)}
              />
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-secondary border border-secondary rounded-lg shadow-xl z-50">
                <div className="p-2">
                  <button
                    onClick={() => {
                      onFileAttach?.()
                      setAttachmentMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <FileIcon size={18} className="text-primary" />
                    <span className="font-medium">File</span>
                  </button>
                  <button
                    onClick={() => {
                      onImageAttach?.()
                      setAttachmentMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <ImageIcon size={18} className="text-primary" />
                    <span className="font-medium">Screenshot/Image</span>
                  </button>
                  <button
                    onClick={() => {
                      onAudioAttach?.()
                      setAttachmentMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <MicIcon size={18} className="text-primary" />
                    <span className="font-medium">Audio</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message Dysporium Chat..."
          rows={1}
          className="flex-1 bg-transparent border-none text-base resize-none outline-none max-h-48 overflow-y-auto placeholder:text-chat-text-secondary disabled:opacity-50 disabled:cursor-not-allowed py-2 px-1"
          disabled={disabled}
        />

        <div className="relative flex-shrink-0">
          <button
            onClick={() => {
              setModelSelectorOpen(!modelSelectorOpen)
              setAttachmentMenuOpen(false)
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-chat-secondary border border-chat-border rounded-lg text-chat-text text-xs hover:bg-chat-hover transition-colors disabled:opacity-50"
            disabled={disabled}
          >
            <span className="font-medium">{selectedModelInfo?.name || selectedModel}</span>
            <ChevronDownIcon 
              size={14} 
              className={`transition-transform ${modelSelectorOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {modelSelectorOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/10"
                onClick={() => setModelSelectorOpen(false)}
              />
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-secondary rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  {AVAILABLE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onModelChange(model.id)
                        setModelSelectorOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedModel === model.id
                          ? 'bg-primary/20 text-primary'
                          : 'text-primary hover:bg-secondary hover:text-primary'
                      }`}
                    >
                      <div className="font-medium">{model.name}</div>
                      {model.description && (
                        <div className="text-xs text-chat-text-secondary mt-0.5">{model.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          title="Send message"
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-transparent border-none text-chat-text-secondary cursor-pointer rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <SendIcon size={18} />
        </button>
      </div>
    </div>
  )
}

