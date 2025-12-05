import { CODE_CLASSES } from '../../../constants/landing/code'
import { CODE_CONTENT } from '../../../config/landing/code'

export function SectionHeader() {
  return (
    <>
      <span className={CODE_CLASSES.content.label}>
        {CODE_CONTENT.section.label}
      </span>
      <h2 className={CODE_CLASSES.content.heading}>
        {CODE_CONTENT.section.heading.line1}
        <br />
        <span className="text-gradient-orange">
          {CODE_CONTENT.section.heading.line2}
        </span>
      </h2>
      <p className={CODE_CLASSES.content.description}>
        {CODE_CONTENT.section.description}
      </p>
    </>
  )
}

