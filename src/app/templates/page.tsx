import { templatesRegistry, type TemplateType } from "@/registry/templates";
import { TemplatesGrid } from "@/components/templates-grid";

export default function TemplatesPage() {
  const byType = [
    {
      type: "page" as TemplateType,
      entries: Object.entries(templatesRegistry)
        .filter(([, t]) => t.type === "page")
        .map(([slug, t]) => ({
          slug,
          name: t.name,
          description: t.description,
          type: t.type,
        })),
    },
  ].filter(({ entries }) => entries.length > 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-lg text-muted-foreground">
          Full-page layouts for chat, prompts, and assistants.
        </p>
      </div>

      <TemplatesGrid byType={byType} />
    </div>
  );
}
