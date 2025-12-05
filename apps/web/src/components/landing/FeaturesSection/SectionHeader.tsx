import { FEATURES_CLASSES } from '../../../constants/landing/features'
import { FEATURES_CONTENT } from '../../../config/landing/features'

export function SectionHeader() {
  return (
    <div className={FEATURES_CLASSES.header.container}>
      <span className={FEATURES_CLASSES.header.label}>
        {FEATURES_CONTENT.section.label}
      </span>
      <h2 className={FEATURES_CLASSES.header.heading}>
        {FEATURES_CONTENT.section.heading.line1}
        <br />
        <span className="text-gradient-orange">
          {FEATURES_CONTENT.section.heading.line2}
        </span>
      </h2>
      <p className={FEATURES_CLASSES.header.description}>
        {FEATURES_CONTENT.section.description}
      </p>
    </div>
  )
}

