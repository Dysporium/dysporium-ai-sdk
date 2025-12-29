interface ErrorDisplayProps {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  const isApiKeyError = error.includes('VITE_OPENAI_API_KEY')

  return (
    <div className="px-8 py-4 bg-secondary border-t border-secondary">
      <div className="max-w-3xl mx-auto">
        <p className="text-primary text-sm mb-2 font-semibold">Error: {error}</p>
        {isApiKeyError && (
          <div className="bg-secondary border border-secondary rounded-lg p-4 mt-2">
            <p className="text-xs text-primary mb-2">
              Please set your OpenAI API key:
            </p>
            <code className="text-xs text-primary bg-secondary px-2 py-1 rounded block mb-2">
              VITE_OPENAI_API_KEY=sk-...
            </code>
            <p className="text-xs text-primary">
              Create a <code className="bg-secondary px-1 py-0.5 rounded">.env</code> file in the
              project root with your API key.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

