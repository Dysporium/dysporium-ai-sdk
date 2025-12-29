import type { ModelId } from '../types'
import { AVAILABLE_MODELS } from '../constants/models'

interface ModelSelectorProps {
  selectedModel: ModelId
  onModelChange: (model: ModelId) => void
  isOpen: boolean
  onToggle: () => void
}

export function ModelSelector({ selectedModel, onModelChange, isOpen, onToggle }: ModelSelectorProps) {
  const selectedModelInfo = AVAILABLE_MODELS.find(m => m.id === selectedModel)

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 bg-chat-secondary border border-chat-border rounded-lg text-chat-text text-sm hover:bg-chat-hover transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <path
            d="M8 2L2 6L8 10L14 6L8 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 10L8 14L14 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-medium">{selectedModelInfo?.name || selectedModel}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/10"
            onClick={onToggle}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-chat-secondary border border-chat-border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id)
                    onToggle()
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedModel === model.id
                      ? 'bg-chat-accent/20 text-chat-accent'
                      : 'text-chat-text hover:bg-chat-hover'
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
  )
}

