import { createFileRoute } from '@tanstack/react-router'
import HeroSection from '../components/landing/HeroSection/index'
import FeaturesSection from '../components/landing/FeaturesSection/index'
import CodeSection from '../components/landing/CodeSection/index'
import Footer from '../components/landing/Footer/index'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-grid-pattern bg-noise">
      <HeroSection />
      <FeaturesSection />
      <CodeSection />
      <Footer />
    </div>
  )
}
