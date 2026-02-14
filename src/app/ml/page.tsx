import { mlRegistry, ML_CATEGORY_ORDER } from "@/registry/ml-registry";
import { MLGrid } from "@/components/ml-grid";

export default function MLPage() {
  const byCategory = ML_CATEGORY_ORDER.map((category) => ({
    category,
    entries: Object.entries(mlRegistry)
      .filter(([, entry]) => entry.category === category)
      .map(([slug, entry]) => ({
        slug,
        name: entry.name,
        description: entry.description,
        type: entry.type,
        category: entry.category,
      })),
  })).filter(({ entries }) => entries.length > 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          ML Components
        </h1>
        <p className="text-lg text-muted-foreground">
          Dashboards, charts, model management, data, training, and inference
          components for ML platforms. Grouped by category.
        </p>
      </div>
      <MLGrid byCategory={byCategory} />
    </div>
  );
}
