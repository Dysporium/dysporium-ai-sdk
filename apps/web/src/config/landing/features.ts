import { Cpu, Layers, Shield, Database, Workflow, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Feature {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES_CONTENT = {
  section: {
    label: 'Features',
    heading: {
      line1: 'Everything you need to',
      line2: 'build with AI',
      highlight: 'build with AI',
    },
    description:
      'A complete toolkit for modern AI development. From simple completions to complex agentic workflows.',
  },
  features: [
    {
      id: 'streaming',
      icon: Zap,
      title: 'Streaming First',
      description:
        'Built-in support for streaming responses with chunk callbacks. Perfect for chatbots and real-time AI.',
    },
    {
      id: 'type-safe',
      icon: Shield,
      title: 'Type Safe',
      description:
        'End-to-end TypeScript support with full inference. Catch errors at compile time, not runtime.',
    },
    {
      id: 'provider-agnostic',
      icon: Layers,
      title: 'Provider Architecture',
      description:
        'Modular provider system with OpenAI, Anthropic, and Qwen support. Add new providers without changing your code.',
    },
    {
      id: 'embeddings',
      icon: Database,
      title: 'Embeddings & Search',
      description:
        'Generate embeddings, compute similarity, and build semantic search with built-in utilities.',
    },
    {
      id: 'tool-calling',
      icon: Workflow,
      title: 'Tool Calling',
      description:
        'First-class support for function calling with automatic tool execution loops.',
    },
    {
      id: 'structured-output',
      icon: Cpu,
      title: 'Structured Output',
      description:
        'JSON mode and JSON Schema support for reliable, structured responses from LLMs.',
    },
  ] as Array<Feature>,
} as const

