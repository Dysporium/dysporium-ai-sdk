export interface FeatureItem {
  id: string
  text: string
}

export const CODE_CONTENT = {
  section: {
    label: 'Developer Experience',
    heading: {
      line1: 'Write less code.',
      line2: 'Ship faster.',
      highlight: 'Ship faster.',
    },
    description:
      'Clean, intuitive APIs that let you focus on building great products instead of wrestling with infrastructure.',
    features: [
      {
        id: 'unified-interface',
        text: 'Unified interface across all providers',
      },
      {
        id: 'automatic-retry',
        text: 'Automatic retry with exponential backoff',
      },
      {
        id: 'rate-limiting',
        text: 'Built-in rate limiting and queuing',
      },
      {
        id: 'error-handling',
        text: 'Comprehensive error handling',
      },
    ] as Array<FeatureItem>,
  },
  code: {
    filename: 'index.ts',
    content: `import { Dysporium } from '@dysporium/sdk'

const ai = new Dysporium({
  provider: 'anthropic',
  model: 'claude-sonnet-4-20250514'
})

// Stream responses in real-time
const stream = ai.stream({
  messages: [
    { role: 'user', content: 'Explain quantum computing' }
  ]
})

for await (const chunk of stream) {
  process.stdout.write(chunk.text)
}

// Or use tools for agentic workflows
const result = await ai.generate({
  messages: [{ role: 'user', content: 'Book a flight to NYC' }],
  tools: [searchFlights, bookFlight, sendConfirmation]
})`,
  },
} as const

