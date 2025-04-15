import HeroSection from "@/components/hero-section"
import PricingSection from "@/components/pricing-section"
import FeaturesSection from "@/components/features-section"
import BackgroundLogo from "@/components/background-logo"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <BackgroundLogo />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  )
}
