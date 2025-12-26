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
      line2: 'OpenAI, Anthropic & Qwen',
      highlight: 'OpenAI, Anthropic & Qwen',
    },
    description:
      'Full support for OpenAI\'s latest models (GPT-5.1, GPT-4o), Anthropic\'s Claude models (Claude 4.5, Claude 4), and Alibaba\'s Qwen models (Qwen 3, Qwen 2.5).',
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
        id: 'qwen',
        text: 'Qwen: Qwen 3, Qwen 2.5 Series',
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
// or
// import { createQwen, streamText } from '@dysporium-sdk/qwen'

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
// or
// import { createQwen, generateText } from '@dysporium-sdk/qwen'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o'),
  messages: [{ role: 'user', content: 'Explain quantum computing' }],
  temperature: 0.7,
  maxTokens: 500,
  seed: 42, // Reproducible outputs
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
  messages: [{ role: 'user', content: 'Solve this step by step' }],
  thinking: {
    type: 'enabled',
    budgetTokens: 10000, // Extended thinking
  },
  topK: 40, // Top-k sampling
})

console.log(result.text)`,
    },
    {
      id: 'qwen',
      label: 'Qwen',
      filename: 'qwen.ts',
      content: `import { createQwen, generateText } from '@dysporium-sdk/qwen'

const qwen = createQwen({
  apiKey: process.env.QWEN_API_KEY,
})

const result = await generateText({
  model: qwen('qwen2.5-72b-instruct'),
  messages: [{ role: 'user', content: 'Write a creative story' }],
  temperature: 0.8,
  topK: 50, // Top-k sampling
  frequencyPenalty: 0.5, // Reduce repetition
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
    {
      id: 'advanced',
      label: 'Advanced',
      filename: 'advanced.ts',
      content: `import { createOpenAI, generateText } from '@dysporium-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Write a creative story',
  temperature: 0.8,
  frequencyPenalty: 0.5, // Reduce repetition
  presencePenalty: 0.3,   // Encourage new topics
  seed: 42,               // Reproducible outputs
  user: 'user-123',       // User tracking
  maxTokens: 1000,
})

console.log(result.text)
console.log(result.systemFingerprint) // Model version`,
    },
  ] as Array<CodeExample>,
} as const

