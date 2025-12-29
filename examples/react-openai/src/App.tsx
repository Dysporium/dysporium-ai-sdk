import { useState } from 'react'
import { useChat } from './hooks/useChat'
import { useModel } from './hooks/useModel'
import {
  Sidebar,
  EmptyState,
  MessagesList,
  ChatInput,
  ErrorDisplay,
} from './components'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { model, setModel } = useModel()
  const { messages, input, streaming, error, messagesEndRef, sendMessage, setInput, clearChat } =
    useChat()

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleFileAttach = () => {
    console.log('File attachment clicked')
  }

  const handleImageAttach = () => {
    console.log('Image attachment clicked')
  }

  const handleAudioAttach = () => {
    console.log('Audio attachment clicked')
  }

  return (
    <div className="flex h-screen w-screen relative">
      <Sidebar isOpen={sidebarOpen} onNewChat={clearChat} hasMessages={messages.length > 0} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <EmptyState onSuggestionClick={handleSuggestionClick} />
              <div className="w-full max-w-3xl mt-8">
                <ChatInput 
                  value={input} 
                  onChange={setInput} 
                  onSend={sendMessage} 
                  disabled={streaming}
                  selectedModel={model}
                  onModelChange={setModel}
                  onFileAttach={handleFileAttach}
                  onImageAttach={handleImageAttach}
                  onAudioAttach={handleAudioAttach}
                />
              </div>
            </div>
          ) : (
            <>
              <MessagesList messages={messages} streaming={streaming} messagesEndRef={messagesEndRef} />
              {error && <ErrorDisplay error={error} />}
              <ChatInput 
                value={input} 
                onChange={setInput} 
                onSend={sendMessage} 
                disabled={streaming}
                selectedModel={model}
                onModelChange={setModel}
                onFileAttach={handleFileAttach}
                onImageAttach={handleImageAttach}
                onAudioAttach={handleAudioAttach}
              />
            </>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default App
