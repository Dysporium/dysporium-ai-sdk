import { ExternalLink, Github } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavItemType = 'link' | 'external' | 'action'

export interface NavItem {
  id: string
  label: string
  href: string
  type: NavItemType
  icon?: LucideIcon
  variant?: 'default' | 'primary'
  external?: boolean
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    id: 'features',
    label: 'Features',
    href: '#features',
    type: 'link',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com',
    type: 'external',
    icon: Github,
    external: true,
  },
  {
    id: 'get-started',
    label: 'Get Started',
    href: '#',
    type: 'action',
    icon: ExternalLink,
    variant: 'primary',
  },
]

export const MOBILE_NAV_ITEMS: Array<NavItem> = [
  {
    id: 'features',
    label: 'Features',
    href: '#features',
    type: 'link',
  },
  {
    id: 'code',
    label: 'Code',
    href: '#code',
    type: 'link',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '#pricing',
    type: 'link',
  },
]

