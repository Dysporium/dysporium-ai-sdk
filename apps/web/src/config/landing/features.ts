import { Cpu, Layers, Shield, Sparkles, Workflow, Zap } from 'lucide-react'
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
      'A complete toolkit for modern AI development. From simple completions to complex multi-agent systems.',
  },
  features: [
    {
      id: 'streaming',
      icon: Zap,
      title: 'Streaming First',
      description:
        'Built-in support for streaming responses. Perfect for chatbots, real-time AI, and interactive applications.',
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
      title: 'Provider Agnostic',
      description:
        'Switch between OpenAI, Anthropic, Google, and more with a single line change.',
    },
    {
      id: 'edge-ready',
      icon: Cpu,
      title: 'Edge Ready',
      description:
        'Optimized for serverless and edge environments. Deploy anywhere JavaScript runs.',
    },
    {
      id: 'built-in-tools',
      icon: Workflow,
      title: 'Built-in Tools',
      description:
        'First-class support for function calling and tool use. Build agents that take action.',
    },
    {
      id: 'smart-caching',
      icon: Sparkles,
      title: 'Smart Caching',
      description:
        'Intelligent response caching reduces costs and latency. Save up to 80% on API calls.',
    },
  ] as Array<Feature>,
} as const

