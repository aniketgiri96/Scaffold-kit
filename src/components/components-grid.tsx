"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export type ComponentCategory = string;

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
}

interface ComponentsGridProps {
  byCategory: { category: ComponentCategory; entries: ComponentEntry[] }[];
}

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 300, damping: 30 },
  }),
};

export function ComponentsGrid({ byCategory }: ComponentsGridProps) {
  let globalIndex = 0;
  return (
    <div className="space-y-8">
      {byCategory.map(({ category, entries }) => (
        <section key={category}>
          <h2 className="font-display mb-4 text-xl font-semibold tracking-tight">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {entries.map(({ slug, name, description }) => {
              const index = globalIndex++;
              return (
                <motion.div
                  key={slug}
                  custom={index}
                  initial="initial"
                  animate="animate"
                  variants={cardVariants}
                >
                  <Link href={`/components/${slug}`}>
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="h-full"
                    >
                      <Card className="group relative overflow-hidden border-border bg-card backdrop-blur-lg transition-all hover:bg-accent/50 hover:border-primary/30 hover:shadow-[0_0_20px_var(--glow-primary)] h-full">
                        <CardHeader className="relative z-10 p-6">
                          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors tracking-tight">
                            {name}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground/60 text-sm line-clamp-2">
                            {description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
