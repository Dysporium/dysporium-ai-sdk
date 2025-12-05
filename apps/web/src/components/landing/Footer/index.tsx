import { FOOTER_CLASSES } from '../../../constants/landing/footer'
import { FOOTER_CONTENT } from '../../../config/landing/footer'
import { BrandSection } from './BrandSection'
import { LinkGroup } from './LinkGroup'
import { FooterBottom } from './FooterBottom'

export default function Footer() {
  return (
    <footer className={FOOTER_CLASSES.footer}>
      <div className={FOOTER_CLASSES.container}>
        <div className={FOOTER_CLASSES.grid}>
          <BrandSection />
          {FOOTER_CONTENT.linkGroups.map((group) => (
            <LinkGroup key={group.id} group={group} />
          ))}
        </div>
        <FooterBottom />
      </div>
    </footer>
  )
}

