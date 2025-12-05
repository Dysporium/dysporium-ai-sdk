import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { CODE_CLASSES } from '../../../constants/landing/code'
import { CODE_CONTENT } from '../../../config/landing/code'
import { highlightLine } from './CodeHighlight'

export function CodeBlock() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const currentExample = CODE_CONTENT.examples[activeTab]
  const lines = currentExample.content.split('\n')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentExample.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={CODE_CLASSES.codeBlock.container}>
      <div className={CODE_CLASSES.codeBlock.glow} />
      <div className={CODE_CLASSES.codeBlock.wrapper}>
        <div className="flex items-center justify-between border-b border-[#2e2e2e]">
          <div className="flex">
            {CODE_CONTENT.examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'text-[#ff6b00] border-b-2 border-[#ff6b00] -mb-px'
                    : 'text-[#9a9a9a] hover:text-white'
                }`}
              >
                {example.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 mr-2 text-xs text-[#9a9a9a] hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className={CODE_CLASSES.codeBlock.header}>
          <span className={CODE_CLASSES.codeBlock.filename}>
            {currentExample.filename}
          </span>
        </div>
        <pre className={CODE_CLASSES.codeBlock.pre}>
          <code className={CODE_CLASSES.codeBlock.code}>
            {lines.map((line, i) => (
              <div key={i} className={CODE_CLASSES.codeBlock.line}>
                <span className={CODE_CLASSES.codeBlock.lineNumber}>
                  {i + 1}
                </span>
                <span
                  dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

