"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { templatesRegistry } from "@/registry/templates";

const HOMEPAGE_SLUGS = [
  "chat-message-row",
  "prompt-input-bar",
  "ai-response-card",
  "typing-indicator",
  "suggested-prompts",
  "ai-chat-playground",
] as const;

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 300, damping: 30 },
  }),
};

export function HomeTemplatesSection() {
  const entries = HOMEPAGE_SLUGS.map((slug) => {
    const t = templatesRegistry[slug];
    return t ? { slug, name: t.name, description: t.description } : null;
  }).filter(Boolean) as { slug: string; name: string; description: string }[];

  return (
    <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
      <div className="max-w-[64rem] mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            AI patterns
          </h2>
          <p className="text-muted-foreground max-w-[36rem] mx-auto">
            Reusable blocks and full-page layouts for chat UIs, prompts, and assistants. Copy the code and paste into your app.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ slug, name, description }, i) => (
            <motion.div
              key={slug}
              custom={i}
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
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/templates"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all templates →
          </Link>
        </div>
      </div>
    </section>
  );
}
