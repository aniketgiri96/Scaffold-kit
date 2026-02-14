import Link from "next/link";
import { templatesRegistry, type TemplateType } from "@/registry/templates";
import { templateManifestMeta } from "@/registry/manifest-meta";
import type { AIPatternCategory } from "@/registry/manifest-types";
import { recipesRegistry } from "@/registry/recipes";
import { TemplatesGrid } from "@/components/templates-grid";

const TYPE_ORDER: TemplateType[] = ["block", "page"];

const PATTERN_CATEGORY_ORDER: AIPatternCategory[] = [
  "Chat",
  "Prompt input",
  "Streaming",
  "Tool use",
  "Errors & retry",
  "Layout",
  "Citations",
  "General",
];

function groupTemplatesByPattern(): { patternCategory: AIPatternCategory; type: TemplateType; entries: { slug: string; name: string; description: string; type: TemplateType }[] }[] {
  const withCategory = Object.entries(templatesRegistry).map(([slug, t]) => ({
    slug,
    name: t.name,
    description: t.description,
    type: t.type,
    patternCategory: (templateManifestMeta[slug]?.patternCategory ?? "General") as AIPatternCategory,
  }));
  const result: { patternCategory: AIPatternCategory; type: TemplateType; entries: { slug: string; name: string; description: string; type: TemplateType }[] }[] = [];
  for (const cat of PATTERN_CATEGORY_ORDER) {
    for (const type of TYPE_ORDER) {
      const entries = withCategory
        .filter((e) => e.patternCategory === cat && e.type === type)
        .map(({ slug, name, description, type: t }) => ({ slug, name, description, type: t }));
      if (entries.length > 0) {
        result.push({ patternCategory: cat, type, entries });
      }
    }
  }
  return result;
}

export default function TemplatesPage() {
  const byPattern = groupTemplatesByPattern();
  const byType = TYPE_ORDER.map((type) => ({
    type,
    entries: Object.entries(templatesRegistry)
      .filter(([, t]) => t.type === type)
      .map(([slug, t]) => ({
        slug,
        name: t.name,
        description: t.description,
        type: t.type,
      })),
  })).filter(({ entries }) => entries.length > 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-lg text-muted-foreground">
          AI-related templates: reusable blocks and full-page layouts for chat, prompts, and assistants. Grouped by AI pattern.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">Recipes</h2>
        <p className="text-muted-foreground text-sm">
          Predefined combinations of templates for full flows. Use these block slugs in order when building a chat screen or minimal chat.
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {Object.entries(recipesRegistry).map(([slug, recipe]) => (
            <li key={slug}>
              <Link
                href={`/recipes/${slug}`}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/30 hover:border-primary/30"
              >
                <span className="font-medium text-foreground">{recipe.name}</span>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  {recipe.blockSlugs.join(" → ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TemplatesGrid byType={byType} byPattern={byPattern} />
    </div>
  );
}
