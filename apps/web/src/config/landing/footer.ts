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
          id: 'examples',
          label: 'Examples',
          href: '#code',
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

