export const CODE_CLASSES = {
  section: 'py-32 px-6 bg-[#0d0d0d]',
  container: 'max-w-7xl mx-auto',
  grid: 'grid lg:grid-cols-2 gap-16 items-center',
  content: {
    label: 'text-[#ff6b00] text-sm font-semibold uppercase tracking-wider mb-4 block',
    heading: 'text-4xl md:text-5xl font-bold mb-6',
    description: 'text-xl text-[#9a9a9a] mb-8 leading-relaxed',
    featureList: 'space-y-4',
    featureItem: 'flex items-center gap-3',
    featureIcon: 'w-5 h-5 bg-[#ff6b00] rounded flex items-center justify-center',
    featureText: 'text-[#b3b3b3]',
  },
  codeBlock: {
    container: 'relative',
    glow: 'absolute -inset-4 bg-gradient-to-r from-[#ff6b00]/20 to-transparent blur-xl opacity-50',
    wrapper: 'relative bg-[#141414] border border-[#2e2e2e] rounded-xl overflow-hidden',
    header: 'flex items-center gap-2 px-4 py-3 border-b border-[#2e2e2e]',
    controls: {
      red: 'w-3 h-3 rounded-full bg-[#ff5f56]',
      yellow: 'w-3 h-3 rounded-full bg-[#ffbd2e]',
      green: 'w-3 h-3 rounded-full bg-[#27ca40]',
    },
    filename: 'ml-4 text-xs text-[#9a9a9a] font-mono',
    pre: 'p-6 overflow-x-auto',
    code: 'text-sm font-mono leading-relaxed',
    line: 'flex',
    lineNumber: 'w-8 text-[#404040] select-none text-right mr-4',
  },
} as const

export const CODE_HIGHLIGHT_COLORS = {
  keyword: 'text-[#ff6b00]',
  string: 'text-[#7ec699]',
  comment: 'text-[#6a6a6a]',
  variable: 'text-[#79c0ff]',
} as const

