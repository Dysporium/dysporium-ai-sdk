import { HERO_CLASSES } from '../../../constants/landing/hero'
import { BackgroundGrid } from './BackgroundGrid'
import { StatusBadge } from './StatusBadge'
import { HeroHeading } from './HeroHeading'
import { HeroDescription } from './HeroDescription'
import { CTAButtons } from './CTAButtons'
import { InstallCommand } from './InstallCommand'

export default function HeroSection() {
  return (
    <section className={HERO_CLASSES.section}>
      <BackgroundGrid />
      <div className={HERO_CLASSES.content}>
        <StatusBadge />
        <HeroHeading />
        <HeroDescription />
        <CTAButtons />
        <InstallCommand />
      </div>
    </section>
  )
}

