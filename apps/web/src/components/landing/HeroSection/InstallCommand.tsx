import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../utils/cn'
import { HERO_CONTENT } from '../../../config/landing/hero'

type PackageManager = 'npm' | 'pnpm'

export function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const [packageManager, setPackageManager] = useState<PackageManager>('npm')
  
  const installCommands = HERO_CONTENT.installCommands || { npm: HERO_CONTENT.installCommand, pnpm: 'pnpm add @dysporium-sdk/openai' }
  const command = installCommands[packageManager] || HERO_CONTENT.installCommand

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const togglePackageManager = () => {
    setPackageManager(prev => prev === 'npm' ? 'pnpm' : 'npm')
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-6 py-4 bg-[#141414] border border-[#2e2e2e] rounded-lg animate-slide-up opacity-0',
        'delay-400'
      )}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={togglePackageManager}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-colors',
            packageManager === 'npm'
              ? 'bg-[#ff6b00] text-white'
              : 'bg-[#2e2e2e] text-[#9a9a9a] hover:text-white'
          )}
          aria-label="Toggle package manager"
        >
          npm
        </button>
        <button
          onClick={togglePackageManager}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-colors',
            packageManager === 'pnpm'
              ? 'bg-[#ff6b00] text-white'
              : 'bg-[#2e2e2e] text-[#9a9a9a] hover:text-white'
          )}
          aria-label="Toggle package manager"
        >
          pnpm
        </button>
      </div>
      <code className="text-[#ff6b00] font-mono text-sm md:text-base">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="text-[#9a9a9a] hover:text-white transition-colors"
        aria-label="Copy command"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  )
}

