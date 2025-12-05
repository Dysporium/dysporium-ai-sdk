import { CODE_CLASSES } from '../../../constants/landing/code'
import { CODE_CONTENT } from '../../../config/landing/code'
import { highlightCode } from './CodeHighlight'

export function CodeBlock() {
  const lines = CODE_CONTENT.code.content.split('\n')

  return (
    <div className={CODE_CLASSES.codeBlock.container}>
      <div className={CODE_CLASSES.codeBlock.glow} />
      <div className={CODE_CLASSES.codeBlock.wrapper}>
        <div className={CODE_CLASSES.codeBlock.header}>
          <div className={CODE_CLASSES.codeBlock.controls.red} />
          <div className={CODE_CLASSES.codeBlock.controls.yellow} />
          <div className={CODE_CLASSES.codeBlock.controls.green} />
          <span className={CODE_CLASSES.codeBlock.filename}>
            {CODE_CONTENT.code.filename}
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
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(line),
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

