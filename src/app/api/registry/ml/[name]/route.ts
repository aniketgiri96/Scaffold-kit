import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { mlRegistry } from "@/registry/ml-registry";

/** Path to chart-theme source so registry serves it as single source of truth. */
const CHART_THEME_PATH = join(
  process.cwd(),
  "src/features/ml/shared/chart-theme.tsx"
);

function getChartThemeContent(): string {
  return readFileSync(CHART_THEME_PATH, "utf8");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name: rawName } = await params;
  const name = rawName.replace(/\.json$/i, "");
  const entry = mlRegistry[name];

  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const files: { path: string; type: "registry:block"; content: string }[] = [
    {
      path: `ml/${entry.slug}.tsx`,
      type: "registry:block",
      content: entry.code,
    },
  ];

  if (entry.code.includes("chart-theme")) {
    files.push({
      path: "ml/shared/chart-theme.tsx",
      type: "registry:block",
      content: getChartThemeContent(),
    });
  }

  /** UI components from shadcn registry; CLI installs these first so @/components/ui/* imports resolve. */
  const registryDependencies = [
    "card",
    "badge",
    "button",
    "progress",
    "table",
    "input",
    "scroll-area",
  ];

  /** npm packages used in ML blocks; CLI runs package-manager install for these. */
  const dependencies =
    entry.code.includes("recharts") || entry.code.includes("lucide-react")
      ? ["recharts", "lucide-react"]
      : entry.code.includes("lucide-react")
        ? ["lucide-react"]
        : [];

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: entry.slug,
    type: "registry:block" as const,
    title: entry.name,
    description: entry.description,
    registryDependencies,
    ...(dependencies.length > 0 && { dependencies }),
    files,
  };

  return NextResponse.json(registryItem, {
    headers: { "Content-Type": "application/json" },
  });
}
