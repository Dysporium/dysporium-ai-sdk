import { cn } from '../../../utils/cn'
import { HERO_CLASSES } from '../../../constants/landing/hero'
import { HERO_CONTENT } from '../../../config/landing/hero'

export function HeroDescription() {
  return (
    <p className={cn(HERO_CLASSES.description, 'delay-200')}>
      {HERO_CONTENT.description}
    </p>
  )
}

