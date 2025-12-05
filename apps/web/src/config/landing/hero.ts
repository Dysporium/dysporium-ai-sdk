export interface CTAButton {
  id: string
  label: string
  href: string
  variant: 'primary' | 'secondary'
  icon?: string
}

export const HERO_CONTENT = {
  badge: {
    text: 'Now in Public Beta',
    show: true,
  },
  heading: {
    line1: 'Build AI at',
    line2: 'Production Scale',
    highlight: 'Production Scale',
  },
  description:
    'The modern TypeScript SDK for building AI applications. Type-safe, streaming-first, and designed for teams who ship fast.',
  installCommand: 'npm install @dysporium/sdk',
  ctaButtons: [
    {
      id: 'start-building',
      label: 'Start Building',
      href: '#',
      variant: 'primary' as const,
      icon: 'ArrowRight',
    },
    {
      id: 'view-examples',
      label: 'View Examples',
      href: '#code',
      variant: 'secondary' as const,
      icon: 'Terminal',
    },
  ] as Array<CTAButton>,
} as const

