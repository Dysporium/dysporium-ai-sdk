export interface CTAButton {
  id: string
  label: string
  href: string
  variant: 'primary' | 'secondary'
  icon?: string
}

export const HERO_CONTENT = {
  badge: {
    text: 'v0.1.0 Released',
    show: true,
  },
  heading: {
    line1: 'Build AI at',
    line2: 'Production Scale',
    highlight: 'Production Scale',
  },
  description:
    'The modern TypeScript SDK for building AI applications. Type-safe, streaming-first, with OpenAI, Anthropic, and Qwen support out of the box.',
  installCommand: 'npm install @dysporium-sdk/openai',
  ctaButtons: [
    {
      id: 'start-building',
      label: 'Start Building',
      href: '#code',
      variant: 'primary' as const,
      icon: 'ArrowRight',
    },
    {
      id: 'view-npm',
      label: 'View on npm',
      href: 'https://www.npmjs.com/package/@dysporium-sdk/core',
      variant: 'secondary' as const,
      icon: 'ExternalLink',
    },
  ] as Array<CTAButton>,
} as const

