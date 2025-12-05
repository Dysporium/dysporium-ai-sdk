export interface FeatureItem {
  id: string
  text: string
}

export interface CodeExample {
  id: string
  label: string
  filename: string
  content: string
}

export const CODE_CONTENT = {
  section: {
    label: 'OpenAI Provider',
    heading: {
      line1: 'Powered by',
      line2: 'OpenAI Models',
      highlight: 'OpenAI Models',
    },
    description:
      'Full support for OpenAI\'s latest models including GPT-4o, GPT-4 Turbo, and text embeddings.',
    features: [
      {
        id: 'gpt-4o',
        text: 'gpt-4o & gpt-4o-mini',
      },
      {
        id: 'gpt-4-turbo',
        text: 'gpt-4-turbo & gpt-4',
      },
      {
        id: 'gpt-3.5',
        text: 'gpt-3.5-turbo',
      },
      {
        id: 'embeddings',
        text: 'text-embedding-3-small & large',
      },
    ] as Array<FeatureItem>,
  },
  examples: [
    {
      id: 'streaming',
      label: 'Streaming',
      filename: 'Chat.tsx',
      content: `import { useState } from 'react'
import { createOpenAI, streamText } from '@dysporium-sdk/openai'

const openai = createOpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

export function Chat() {
  const [response, setResponse] = useState('')

  async function ask(prompt: string) {
    setResponse('')
    await streamText({
      model: openai('gpt-4o'),
      prompt,
      onChunk: (chunk) => {
        setResponse((prev) => prev + chunk.textDelta)
      },
    })
  }

  return <button onClick={() => ask('Hello!')}>Ask AI</button>
}`,
    },
    {
      id: 'generate',
      label: 'Generate',
      filename: 'generate.ts',
      content: `import { createOpenAI, generateText } from '@dysporium-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Explain quantum computing',
})

console.log(result.text)
console.log(result.usage) // { promptTokens, completionTokens, totalTokens }`,
    },
    {
      id: 'embeddings',
      label: 'Embeddings',
      filename: 'embed.ts',
      content: `import { createOpenAI, embed, cosineSimilarity } from '@dysporium-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: 'Hello world',
})

console.log(result.embedding) // [0.123, -0.456, ...]
console.log(result.embedding.length) // 1536 dimensions`,
    },
  ] as Array<CodeExample>,
} as const

