"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TemplateType } from "@/registry/templates";

export interface TemplateEntry {
  slug: string;
  name: string;
  description: string;
  type: TemplateType;
}

interface TemplatesGridProps {
  byType: { type: TemplateType; entries: TemplateEntry[] }[];
}

const typeLabels: Record<TemplateType, string> = {
  block: "Block",
  page: "Page",
};

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 300, damping: 30 },
  }),
};

export function TemplatesGrid({ byType }: TemplatesGridProps) {
  let globalIndex = 0;
  return (
    <div className="space-y-8">
      {byType.map(({ type, entries }) => (
        <section key={type}>
          <h2 className="font-display mb-4 text-xl font-semibold tracking-tight">
            AI {typeLabels[type]}s
          </h2>
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
                  <Link href={`/templates/${slug}`}>
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="h-full"
                    >
                      <Card className="group relative overflow-hidden transition-all hover:bg-accent/50 hover:border-primary/30 hover:shadow-[0_0_20px_var(--glow-primary)] h-full">
                        <CardHeader className="relative z-10 p-6">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors tracking-tight">
                              {name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {typeLabels[type]}
                            </Badge>
                          </div>
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
