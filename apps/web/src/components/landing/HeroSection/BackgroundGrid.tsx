import { HERO_CONSTANTS } from '../../../constants/landing/hero'

export function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid"
            width={HERO_CONSTANTS.grid.patternSize}
            height={HERO_CONSTANTS.grid.patternSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${HERO_CONSTANTS.grid.patternSize} 0 L 0 0 0 ${HERO_CONSTANTS.grid.patternSize}`}
              fill="none"
              stroke={HERO_CONSTANTS.grid.strokeColor}
              strokeWidth={HERO_CONSTANTS.grid.strokeWidth}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  )
}

