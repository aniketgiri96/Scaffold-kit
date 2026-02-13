import { templatesRegistry, type TemplateType } from "@/registry/templates";
import { TemplatesGrid } from "@/components/templates-grid";

const TYPE_ORDER: TemplateType[] = ["block", "page"];

export default function TemplatesPage() {
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
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-lg text-muted-foreground">
          AI-related templates: reusable blocks and full-page layouts for chat, prompts, and assistants.
        </p>
      </div>
      <TemplatesGrid byType={byType} />
    </div>
  );
}
