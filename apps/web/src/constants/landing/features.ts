export const FEATURES_CLASSES = {
  section: 'py-32 px-6',
  container: 'max-w-7xl mx-auto',
  header: {
    container: 'text-center mb-20',
    label: 'text-[#ff6b00] text-sm font-semibold uppercase tracking-wider mb-4 block',
    heading: 'text-4xl md:text-5xl font-bold mb-6',
    description: 'text-xl text-[#9a9a9a] max-w-2xl mx-auto',
  },
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  card: {
    base: 'group p-8 bg-[#141414] border border-[#2e2e2e] rounded-xl hover:border-[#ff6b00]/50 transition-all duration-300 hover:-translate-y-1',
    icon: {
      container:
        'w-12 h-12 bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg flex items-center justify-center text-[#ff6b00] mb-6 group-hover:bg-[#ff6b00] group-hover:text-[#0a0a0a] transition-colors',
      size: 'w-6 h-6',
    },
    title: 'text-xl font-semibold mb-3',
    description: 'text-[#9a9a9a] leading-relaxed',
  },
} as const

