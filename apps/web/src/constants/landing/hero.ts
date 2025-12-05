export const HERO_CONSTANTS = {
  grid: {
    patternSize: 100,
    strokeColor: '#ff6b00',
    strokeWidth: 0.5,
    opacity: 0.05,
  },
  animation: {
    delays: {
      badge: 0,
      heading: 100,
      description: 200,
      cta: 300,
      install: 400,
      stats: 500,
    },
  },
} as const

export const HERO_CLASSES = {
  section: 'relative min-h-screen flex items-center justify-center overflow-hidden pt-20',
  background: 'absolute inset-0 overflow-hidden',
  grid: 'absolute inset-0 w-full h-full opacity-5',
  content: 'relative z-10 max-w-6xl mx-auto px-6 text-center',
  badge: 'inline-flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] border border-[#2e2e2e] rounded-full mb-8 animate-slide-up opacity-0',
  badgeDot: 'w-2 h-2 bg-[#ff6b00] rounded-full animate-pulse',
  badgeText: 'text-sm text-[#9a9a9a] font-medium',
  heading: 'text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-slide-up opacity-0',
  description: 'text-xl md:text-2xl text-[#9a9a9a] max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up opacity-0',
  ctaContainer: 'flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up opacity-0',
  statsContainer: 'grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-slide-up opacity-0',
} as const

