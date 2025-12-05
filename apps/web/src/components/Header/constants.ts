export const HEADER_CONFIG = {
  scrollThreshold: 20,
  logo: {
    src: '/logo.png',
    alt: 'Dysporium SDK',
    height: 40,
  },
  brand: {
    name: 'Dysporium',
    suffix: 'SDK',
  },
  zIndex: {
    header: 50,
    overlay: 50,
    drawer: 50,
  },
  drawer: {
    width: 320,
  },
} as const

export const HEADER_CLASSES = {
  base: 'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
  scrolled: 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2e2e2e]',
  transparent: 'bg-transparent',
  container: 'max-w-7xl mx-auto px-6 py-4 flex items-center justify-between',
  logo: 'flex flex-col items-center gap-2 group',
  nav: {
    desktop: 'hidden md:flex items-center gap-8',
    mobile: 'p-6 flex flex-col gap-4',
  },
  button: {
    menu: 'md:hidden p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors',
    close: 'p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors',
  },
  overlay: 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden',
  drawer: {
    base: 'fixed top-0 right-0 h-full bg-[#0a0a0a] border-l border-[#2e2e2e] z-50 transform transition-transform duration-300 ease-out md:hidden',
    open: 'translate-x-0',
    closed: 'translate-x-full',
  },
} as const

