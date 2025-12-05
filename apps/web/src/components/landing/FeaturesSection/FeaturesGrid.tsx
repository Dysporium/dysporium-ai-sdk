import { FEATURES_CLASSES } from '../../../constants/landing/features'
import { FEATURES_CONTENT } from '../../../config/landing/features'
import { FeatureCard } from './FeatureCard'

export function FeaturesGrid() {
  return (
    <div className={FEATURES_CLASSES.grid}>
      {FEATURES_CONTENT.features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  )
}

