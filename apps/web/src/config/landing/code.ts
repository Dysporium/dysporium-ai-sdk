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
    label: 'AI Providers',
    heading: {
      line1: 'Powered by',
      line2: 'OpenAI & Anthropic',
      highlight: 'OpenAI & Anthropic',
    },
    description:
      'Full support for OpenAI\'s latest models (GPT-5.1, GPT-4o) and Anthropic\'s Claude models (Claude 4.5, Claude 4).',
    features: [
      {
        id: 'openai',
        text: 'OpenAI: GPT-5.1, GPT-4o, Codex',
      },
      {
        id: 'anthropic',
        text: 'Anthropic: Claude 4.5, Claude 4',
      },
      {
        id: 'embeddings',
        text: 'OpenAI Embeddings',
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
// or
// import { createAnthropic, streamText } from '@dysporium-sdk/anthropic'

const openai = createOpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

export function Chat() {
  const [response, setResponse] = useState('')

  async function ask(prompt: string) {
    setResponse('')
    await streamText({
      model: openai('gpt-4o'),
      messages: [{ role: 'user', content: prompt }],
      onChunk: (chunk) => {
        if (chunk.type === 'text-delta') {
          setResponse((prev) => prev + chunk.textDelta)
        }
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
// or
// import { createAnthropic, generateText } from '@dysporium-sdk/anthropic'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o'),
  messages: [{ role: 'user', content: 'Explain quantum computing' }],
})

console.log(result.text)
console.log(result.usage) // { inputTokens, outputTokens, totalTokens }`,
    },
    {
      id: 'anthropic',
      label: 'Anthropic',
      filename: 'anthropic.ts',
      content: `import { createAnthropic, generateText } from '@dysporium-sdk/anthropic'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const result = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  messages: [{ role: 'user', content: 'Hello!' }],
})

console.log(result.text)`,
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

