import { FOOTER_CLASSES } from '../../../constants/landing/footer'
import { FOOTER_CONTENT } from '../../../config/landing/footer'

export function BrandSection() {
  return (
    <div className={FOOTER_CLASSES.brand.container}>
      <div className={FOOTER_CLASSES.brand.logoContainer}>
        <img
          src={FOOTER_CONTENT.brand.logo.src}
          alt={FOOTER_CONTENT.brand.logo.alt}
          className={FOOTER_CLASSES.brand.logo}
          height={FOOTER_CONTENT.brand.logo.height}
        />
        <span className={FOOTER_CLASSES.brand.name}>
          {FOOTER_CONTENT.brand.name}
          <span className={FOOTER_CLASSES.brand.suffix}>
            {FOOTER_CONTENT.brand.suffix}
          </span>
        </span>
      </div>
      <p className={FOOTER_CLASSES.brand.tagline}>
        {FOOTER_CONTENT.brand.tagline}
      </p>
    </div>
  )
}

