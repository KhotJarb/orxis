import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import BeforeAfter from "@/components/BeforeAfter";
import HowItWorks from "@/components/HowItWorks";
import UseCaseTeaser from "@/components/UseCaseTeaser";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <BentoGrid />
      <BeforeAfter />
      <HowItWorks />
      <div id="use-cases"><UseCaseTeaser /></div>
      <Features />
      <CTASection />
      <Footer />
    </main>
  );
}
