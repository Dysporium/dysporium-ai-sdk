import { CODE_CLASSES } from '../../../constants/landing/code'
import { SectionHeader } from './SectionHeader'
import { FeatureList } from './FeatureList'
import { CodeBlock } from './CodeBlock'

export default function CodeSection() {
  return (
    <section id="code" className={CODE_CLASSES.section}>
      <div className={CODE_CLASSES.container}>
        <div className={CODE_CLASSES.grid}>
          <div>
            <SectionHeader />
            <FeatureList />
          </div>

          <CodeBlock />
        </div>
      </div>
    </section>
  )
}

