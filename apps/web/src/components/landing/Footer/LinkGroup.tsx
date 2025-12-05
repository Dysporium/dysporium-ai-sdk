import { FOOTER_CLASSES } from '../../../constants/landing/footer'
import type { FooterLinkGroup } from '../../../config/landing/footer'

interface LinkGroupProps {
  group: FooterLinkGroup
}

export function LinkGroup({ group }: LinkGroupProps) {
  return (
    <div>
      <h4 className={FOOTER_CLASSES.linkGroup.title}>{group.title}</h4>
      <ul className={FOOTER_CLASSES.linkGroup.list}>
        {group.links.map((link) => (
          <li key={link.id}>
            <a href={link.href} className={FOOTER_CLASSES.linkGroup.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

