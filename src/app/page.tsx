import { HomeHero } from "@/components/home-hero";
import { HomeTemplatesSection } from "@/components/home-templates-section";
import { HeroBackground } from "@/components/hero-background";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HeroBackground />
      <HomeHero />
      <HomeTemplatesSection />
    </div>
  );
}
