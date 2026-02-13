"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export function HomeHero() {
  return (
    <main className="flex-1 relative z-10">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container mx-auto px-4 flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <motion.div
            variants={container}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center gap-4"
          >
            <motion.h1
              variants={item}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
            >
              Future-Proof Your <span className="text-primary italic">Design System</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            >
              A premium, high-performance UI library with
              <span className="text-primary/80 font-semibold"> glassmorphism</span>,
              <span className="text-primary/80 font-semibold font-mono"> neon glows</span>,
              and state-of-the-art aesthetics.
            </motion.p>
            <motion.div variants={item} className="space-x-4 pt-4 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-transform hover:scale-105 active:scale-95"
                asChild
              >
                <Link href="/components">Explore Components</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full border-border bg-muted/50 backdrop-blur-md hover:bg-muted transition-transform hover:scale-105 active:scale-95"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  View GitHub
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
