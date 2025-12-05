import { ArrowRight, Terminal, ExternalLink } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { HERO_CLASSES } from '../../../constants/landing/hero'
import { HERO_CONTENT } from '../../../config/landing/hero'

const iconMap = {
  ArrowRight,
  Terminal,
  ExternalLink,
}

export function CTAButtons() {
  return (
    <div className={cn(HERO_CLASSES.ctaContainer, 'delay-300')}>
      {HERO_CONTENT.ctaButtons.map((button) => {
        const IconComponent = button.icon ? iconMap[button.icon as keyof typeof iconMap] : null
        const isExternal = button.href.startsWith('http')

        return (
          <a
            key={button.id}
            href={button.href}
            className={`btn-${button.variant} inline-flex items-center gap-2`}
            {...(isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            {button.label}
            {IconComponent && <IconComponent size={16} />}
          </a>
        )
      })}
    </div>
  )
}

