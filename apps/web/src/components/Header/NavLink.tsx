import { cn } from '../../utils/cn'
import type { NavItem } from '../../config/navConfig'

interface NavLinkProps {
  item: NavItem
  onClick?: () => void
  className?: string
  variant?: 'desktop' | 'mobile'
}

export function NavLink({ item, onClick, className, variant = 'desktop' }: NavLinkProps) {
  const baseClasses =
    variant === 'desktop'
      ? 'text-[#9a9a9a] hover:text-white transition-colors text-sm font-medium uppercase tracking-wider'
      : 'text-[#9a9a9a] hover:text-white transition-colors text-lg font-medium py-2'

  const primaryClasses = 'btn-primary inline-flex items-center gap-2'

  if (item.variant === 'primary') {
    return (
      <a
        href={item.href}
        onClick={onClick}
        className={cn(primaryClasses, className)}
        aria-label={item.label}
      >
        {item.label}
        {item.icon && <item.icon size={14} />}
      </a>
    )
  }

  if (item.type === 'external') {
    return (
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={cn(baseClasses, className)}
        aria-label={item.label}
      >
        {item.icon ? <item.icon size={20} /> : item.label}
      </a>
    )
  }

  return (
    <a
      href={item.href}
      onClick={onClick}
      className={cn(baseClasses, className)}
      aria-label={item.label}
    >
      {item.label}
    </a>
  )
}

