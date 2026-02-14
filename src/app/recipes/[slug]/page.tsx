import Link from "next/link";
import { notFound } from "next/navigation";
import { recipesRegistry } from "@/registry/recipes";
import { templatesRegistry } from "@/registry/templates";
import { registry as componentsRegistry } from "@/registry";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComponentDetailMotion } from "@/components/component-detail-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(recipesRegistry).map((slug) => ({ slug }));
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = recipesRegistry[slug];

  if (!recipe) {
    return notFound();
  }

  const blockLinks = recipe.blockSlugs.map((blockSlug) => {
    const template = templatesRegistry[blockSlug];
    const component = componentsRegistry[blockSlug];
    const name = template?.name ?? component?.name ?? blockSlug;
    const href = template ? `/templates/${blockSlug}` : `/components/${blockSlug}`;
    const type = template ? (template.type === "page" ? "Page" : "Block") : "Component";
    return { slug: blockSlug, name, href, isTemplate: !!template, type };
  });

  return (
    <ComponentDetailMotion>
      <Button variant="ghost" size="sm" className="-ml-2 mb-2" asChild>
        <Link href="/templates" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Back to Templates
        </Link>
      </Button>
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight">{recipe.name}</h1>
        <p className="text-lg text-muted-foreground">{recipe.description}</p>
        {recipe.layoutHint && (
          <Badge variant="secondary" className="font-mono text-xs font-normal">
            {recipe.layoutHint}
          </Badge>
        )}
      </div>
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Blocks in order</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Compose these templates or components in this order. Open each to copy code or fetch from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">GET /api/recipes/{slug}</code>.
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-1">
          {blockLinks.map((block, i) => (
            <li key={block.slug}>
              <Link href={block.href} className="block h-full">
                <Card className="group h-full transition-all hover:bg-accent/30 hover:border-primary/30 hover:shadow-[0_0_20px_var(--glow-primary)]">
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                        {block.name}
                      </CardTitle>
                      <CardDescription className="mt-0.5 font-mono text-xs">
                        {block.slug}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {block.type}
                    </Badge>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </ComponentDetailMotion>
  );
}
