import { Check } from 'lucide-react'
import { CODE_CLASSES } from '../../../constants/landing/code'
import { CODE_CONTENT } from '../../../config/landing/code'

export function FeatureList() {
  return (
    <ul className={CODE_CLASSES.content.featureList}>
      {CODE_CONTENT.section.features.map((feature) => (
        <li key={feature.id} className={CODE_CLASSES.content.featureItem}>
          <div className={CODE_CLASSES.content.featureIcon}>
            <Check size={12} className="text-[#0a0a0a]" />
          </div>
          <span className={CODE_CLASSES.content.featureText}>{feature.text}</span>
        </li>
      ))}
    </ul>
  )
}

