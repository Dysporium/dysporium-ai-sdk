import { Link } from '@tanstack/react-router'
import { cn } from '../../utils/cn'
import { HEADER_CONFIG } from '../../constants/constants'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('flex items-center gap-3 group', className)}
    >
      <img
        src={HEADER_CONFIG.logo.src}
        alt={HEADER_CONFIG.logo.alt}
        className="h-10 w-auto"
        height={HEADER_CONFIG.logo.height}
      />
      <span className="text-xl font-bold tracking-tight">
        {HEADER_CONFIG.brand.name}
        <span className="text-[#ff6b00]">{HEADER_CONFIG.brand.suffix}</span>
      </span>
    </Link>
  )
}

