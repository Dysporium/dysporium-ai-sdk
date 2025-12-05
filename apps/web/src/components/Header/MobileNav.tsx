import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { MOBILE_NAV_ITEMS, NAV_ITEMS } from '../../config/navConfig'
import { NavLink } from './NavLink'
import { HEADER_CLASSES } from '../../constants/constants'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const actionItems = NAV_ITEMS.filter((item) => item.type === 'external' || item.variant === 'primary')

  return (
    <>
      <div
        className={cn(
          HEADER_CLASSES.overlay,
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          HEADER_CLASSES.drawer.base,
          isOpen ? HEADER_CLASSES.drawer.open : HEADER_CLASSES.drawer.closed
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between p-6 border-b border-[#2e2e2e]">
          <span className="text-lg font-bold">Menu</span>
          <button
            onClick={onClose}
            className={HEADER_CLASSES.button.close}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className={HEADER_CLASSES.nav.mobile}>
          {MOBILE_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              onClick={onClose}
              variant="mobile"
            />
          ))}

          <hr className="border-[#2e2e2e] my-4" />

          {actionItems.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              onClick={onClose}
              variant="mobile"
            />
          ))}
        </nav>
      </aside>
    </>
  )
}

