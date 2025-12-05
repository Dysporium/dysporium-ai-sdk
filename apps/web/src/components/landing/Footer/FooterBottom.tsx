import { FOOTER_CLASSES } from '../../../constants/landing/footer'
import { FOOTER_CONTENT } from '../../../config/landing/footer'

export function FooterBottom() {
  return (
    <div className={FOOTER_CLASSES.bottom.container}>
      <p className={FOOTER_CLASSES.bottom.copyright}>
        © {FOOTER_CONTENT.copyright.year} {FOOTER_CONTENT.copyright.company}.{' '}
        {FOOTER_CONTENT.copyright.text}
      </p>
    </div>
  )
}

