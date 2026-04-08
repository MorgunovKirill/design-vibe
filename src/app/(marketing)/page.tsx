import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { LogoBar } from "@/components/landing/logo-bar";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCases } from "@/components/landing/use-cases";
import { Integrations } from "@/components/landing/integrations";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LogoBar />
        <FeaturesSection />
        <HowItWorks />
        <UseCases />
        <Integrations />
        <Testimonials />
        <PricingSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
