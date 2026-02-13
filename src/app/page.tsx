import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <Navbar />
      <main className="flex-1 relative z-10">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container mx-auto px-4 flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Future-Proof Your <span className="text-primary italic">Design System</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A premium, high-performance UI library with
              <span className="text-primary/80 font-semibold"> glassmorphism</span>,
              <span className="text-primary/80 font-semibold font-mono"> neon glows</span>,
              and state-of-the-art aesthetics.
            </p>
            <div className="space-x-4 pt-4">
              <Button size="lg" className="h-12 px-8 rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-transform hover:scale-105 active:scale-95" asChild>
                <Link href="/components">Explore Components</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-transform hover:scale-105 active:scale-95" asChild>
                <Link href="https://github.com" target="_blank">View GitHub</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
