import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { QuoteSection } from "@/components/quote/QuoteSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <StackSection />
        <TestimonialsSection />
        <QuoteSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
