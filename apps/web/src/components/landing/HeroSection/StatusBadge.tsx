import { cn } from '../../../utils/cn'
import { HERO_CLASSES } from '../../../constants/landing/hero'
import { HERO_CONTENT } from '../../../config/landing/hero'

export function StatusBadge() {
  return (
    <div className={cn(HERO_CLASSES.badge, 'delay-100')}>
      <span className={HERO_CLASSES.badgeDot} />
      <span className={HERO_CLASSES.badgeText}>{HERO_CONTENT.badge.text}</span>
    </div>
  )
}
