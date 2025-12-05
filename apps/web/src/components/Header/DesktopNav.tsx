import { NAV_ITEMS } from './navConfig'
import { NavLink } from './NavLink'
import { HEADER_CLASSES } from './constants'

export function DesktopNav() {
  return (
    <nav className={HEADER_CLASSES.nav.desktop}>
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.id} item={item} variant="desktop" />
      ))}
    </nav>
  )
}

