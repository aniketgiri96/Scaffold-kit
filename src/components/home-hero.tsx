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
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
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
              One-Stop UI Kit for <span className="text-gradient-accent italic">AI Developers</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            >
              Copy-paste components and AI patterns (chat, prompts, agents). Works with
              <span className="text-primary/80 font-semibold"> Cursor</span> and
              <span className="text-primary/80 font-semibold"> Copilot</span>, with
              consistent <code className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-sm">@/components/ui</code> imports.
            </motion.p>
            <motion.div variants={item} className="space-x-4 pt-4 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full shadow-[0_0_20px_var(--glow-primary)] ring-2 ring-primary/30 ring-offset-2 ring-offset-background transition-transform hover:scale-105 hover:shadow-[0_0_28px_var(--glow-primary)] active:scale-95"
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
                <Link href="/templates">AI patterns</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
