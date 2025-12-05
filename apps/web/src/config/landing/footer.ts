export interface FooterLink {
  id: string
  label: string
  href: string
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
      id: 'product',
      title: 'Product',
      links: [
        {
          id: 'features',
          label: 'Features',
          href: '#features',
        },
        {
          id: 'documentation',
          label: 'Documentation',
          href: '#',
        },
        {
          id: 'changelog',
          label: 'Changelog',
          href: '#',
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

