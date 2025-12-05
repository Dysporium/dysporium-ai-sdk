import { FEATURES_CLASSES } from '../../../constants/landing/features'
import type { Feature } from '../../../config/landing/features'

interface FeatureCardProps {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon

  return (
    <div className={FEATURES_CLASSES.card.base}>
      <div className={FEATURES_CLASSES.card.icon.container}>
        <IconComponent className={FEATURES_CLASSES.card.icon.size} />
      </div>
      <h3 className={FEATURES_CLASSES.card.title}>{feature.title}</h3>
      <p className={FEATURES_CLASSES.card.description}>{feature.description}</p>
    </div>
  )
}

