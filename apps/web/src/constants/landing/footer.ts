export const FOOTER_CLASSES = {
  footer: 'py-16 px-6 border-t border-[#2e2e2e]',
  container: 'max-w-7xl mx-auto',
  grid: 'grid md:grid-cols-4 gap-12 mb-12',
  brand: {
    container: 'md:col-span-1',
    logoContainer: 'flex items-center gap-3 mb-4',
    logo: 'h-10 w-auto',
    name: 'text-xl font-bold tracking-tight',
    suffix: 'text-[#ff6b00]',
    tagline: 'text-[#9a9a9a] text-sm',
  },
  linkGroup: {
    title: 'font-semibold mb-4 text-sm uppercase tracking-wider',
    list: 'space-y-3 text-[#9a9a9a]',
    link: 'hover:text-white transition-colors',
  },
  bottom: {
    container:
      'pt-8 border-t border-[#2e2e2e] flex flex-col md:flex-row items-center justify-between gap-4',
    copyright: 'text-[#9a9a9a] text-sm',
  },
} as const

