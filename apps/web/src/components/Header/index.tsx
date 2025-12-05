import { useState } from 'react'
import { cn } from '../../utils/cn'
import { useScrollEffect } from './useScrollEffect'
import { Logo } from './Logo'
import { DesktopNav } from './DesktopNav'
import { MobileMenuButton } from './MobileMenuButton'
import { MobileNav } from './MobileNav'
import { HEADER_CLASSES } from '../../constants/constants'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isScrolled = useScrollEffect()

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          HEADER_CLASSES.base,
          isScrolled ? HEADER_CLASSES.scrolled : HEADER_CLASSES.transparent
        )}
      >
        <div className={HEADER_CLASSES.container}>
          <Logo />
          <DesktopNav />
          <MobileMenuButton onClick={handleMobileMenuToggle} />
        </div>
      </header>

      <MobileNav isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
    </>
  )
}

