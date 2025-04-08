import HeroSection from "@/components/hero-section"
import PricingSection from "@/components/pricing-section"
import FeaturesSection from "@/components/features-section"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  )
}
