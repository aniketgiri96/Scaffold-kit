import { Navbar } from "@/components/layout/navbar";
import { HomeHero } from "@/components/home-hero";
import { HeroBackground } from "@/components/hero-background";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <HomeHero />
    </div>
  );
}
