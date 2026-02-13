import { registry, type ComponentCategory } from "@/registry";
import { ComponentsGrid } from "@/components/components-grid";

const CATEGORY_ORDER: ComponentCategory[] = [
  "Forms",
  "Data display",
  "Layout",
  "Navigation",
  "Overlay",
  "Feedback",
];

export default function ComponentsPage() {
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    entries: Object.entries(registry)
      .filter(([, c]) => c.category === category)
      .map(([slug, c]) => ({ slug, name: c.name, description: c.description })),
  })).filter(({ entries }) => entries.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground">
          Beautifully designed components built with Radix UI and Tailwind CSS.
        </p>
      </div>
      <ComponentsGrid byCategory={byCategory} />
    </div>
  );
}
