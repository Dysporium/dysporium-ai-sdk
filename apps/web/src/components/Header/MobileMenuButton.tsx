import { Menu } from 'lucide-react'
import { HEADER_CLASSES } from './constants'

interface MobileMenuButtonProps {
  onClick: () => void
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={HEADER_CLASSES.button.menu}
      aria-label="Open menu"
      aria-expanded="false"
    >
      <Menu size={24} />
    </button>
  )
}

