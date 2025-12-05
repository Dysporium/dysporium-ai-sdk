import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../utils/cn'
import { HERO_CONTENT } from '../../../config/landing/hero'

export function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const command = HERO_CONTENT.installCommand

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-4 px-6 py-4 bg-[#141414] border border-[#2e2e2e] rounded-lg animate-slide-up opacity-0',
        'delay-400'
      )}
    >
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

