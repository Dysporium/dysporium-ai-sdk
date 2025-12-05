import { FEATURES_CLASSES } from '../../../constants/landing/features'
import { SectionHeader } from './SectionHeader'
import { FeaturesGrid } from './FeaturesGrid'

export default function FeaturesSection() {
  return (
    <section id="features" className={FEATURES_CLASSES.section}>
      <div className={FEATURES_CLASSES.container}>
        <SectionHeader />
        <FeaturesGrid />
      </div>
    </section>
  )
}

