import { cn } from '../../../utils/cn'
import { HERO_CLASSES } from '../../../constants/landing/hero'
import { HERO_CONTENT } from '../../../config/landing/hero'

export function HeroHeading() {
  return (
    <h1 className={cn(HERO_CLASSES.heading, 'delay-100')}>
      {HERO_CONTENT.heading.line1}
      <br />
      <span className="text-gradient-orange">{HERO_CONTENT.heading.line2}</span>
    </h1>
  )
}

