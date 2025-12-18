export interface FooterLink {
  id: string
  label: string
  href: string
  external?: boolean
}

export interface FooterLinkGroup {
  id: string
  title: string
  links: Array<FooterLink>
}

export const FOOTER_CONTENT = {
  brand: {
    logo: {
      src: '/logo.png',
      alt: 'Dysporium SDK',
      height: 40,
    },
    name: 'Dysporium',
    suffix: 'SDK',
    tagline: 'Build AI applications at production scale.',
  },
  linkGroups: [
    {
      id: 'packages',
      title: 'Packages',
      links: [
        {
          id: 'core',
          label: '@dysporium-sdk/core',
          href: 'https://www.npmjs.com/package/@dysporium-sdk/core',
          external: true,
        },
        {
          id: 'openai',
          label: '@dysporium-sdk/openai',
          href: 'https://www.npmjs.com/package/@dysporium-sdk/openai',
          external: true,
        },
        {
          id: 'anthropic',
          label: '@dysporium-sdk/anthropic',
          href: 'https://www.npmjs.com/package/@dysporium-sdk/anthropic',
          external: true,
        },
        {
          id: 'qwen',
          label: '@dysporium-sdk/qwen',
          href: 'https://www.npmjs.com/package/@dysporium-sdk/qwen',
          external: true,
        },
        {
          id: 'provider',
          label: '@dysporium-sdk/provider',
          href: 'https://www.npmjs.com/package/@dysporium-sdk/provider',
          external: true,
        },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        {
          id: 'features',
          label: 'Features',
          href: '#features',
        },
        {
          id: 'documentation',
          label: 'Documentation',
          href: 'https://dysporium.mintlify.app/getting-started',
          external: true,
        },
        {
          id: 'examples',
          label: 'Examples',
          href: 'https://dysporium.mintlify.app/examples/basic-usage',
          external: true,
        },
        {
          id: 'github',
          label: 'GitHub',
          href: 'https://github.com/dysporium/dysporium-sdk',
          external: true,
        },
      ],
    },
  ] as Array<FooterLinkGroup>,
  copyright: {
    year: 2025,
    company: 'Dysporium',
    text: 'All rights reserved.',
  },
} as const

