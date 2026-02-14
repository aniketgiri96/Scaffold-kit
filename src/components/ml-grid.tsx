"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slugifyCategory } from "@/lib/utils";
import type { MLTemplateType, MLCategory } from "@/registry/ml-registry";

export interface MLEntry {
  slug: string;
  name: string;
  description: string;
  type: MLTemplateType;
  category: MLCategory;
}

interface MLGridProps {
  byCategory: { category: MLCategory; entries: MLEntry[] }[];
}

const typeLabels: Record<MLTemplateType, string> = {
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

function MLCard({
  slug,
  name,
  description,
  type,
  category,
  index,
}: MLEntry & { index: number }) {
  return (
    <motion.div
      custom={index}
      initial="initial"
      animate="animate"
      variants={cardVariants}
    >
      <Link href={`/ml/${slug}`} className="block cursor-pointer">
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="h-full"
        >
          <Card className="group relative overflow-hidden transition-all hover:bg-accent/50 hover:border-primary/30 hover:shadow-[0_0_20px var(--glow-primary)] h-full cursor-pointer">
            <CardHeader className="relative z-10 p-6">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {name}
                </CardTitle>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {typeLabels[type]}
                </Badge>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {category}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2 text-sm text-muted-foreground/60">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function MLGrid({ byCategory }: MLGridProps) {
  let globalIndex = 0;
  return (
    <div className="space-y-10">
      {byCategory.map(({ category, entries }) => (
        <section key={category} id={slugifyCategory(category)}>
          <h2 className="font-display mb-4 text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-2 cursor-default select-none">
            {category}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <MLCard key={entry.slug} {...entry} index={globalIndex++} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
