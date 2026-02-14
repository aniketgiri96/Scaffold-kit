import { NextResponse } from "next/server";
import { templatesRegistry } from "@/registry/templates";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name: rawName } = await params;
  const name = rawName.replace(/\.json$/i, "");
  const entry = templatesRegistry[name];

  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  /** UI components from shadcn registry; CLI installs these first so @/components/ui/* imports resolve. */
  const registryDependencies = [
    "avatar",
    "button",
    "card",
    "input",
    "textarea",
    "badge",
    "scroll-area",
    "sheet",
    "collapsible",
    "alert",
    "skeleton",
    "select",
  ];

  /** npm packages used in templates (lucide-react); CLI runs package-manager install. */
  const dependencies = ["lucide-react"];

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: entry.slug,
    type: "registry:block" as const,
    title: entry.name,
    description: entry.description,
    registryDependencies,
    dependencies,
    files: [
      {
        path: `templates/${entry.slug}.tsx`,
        type: "registry:block" as const,
        content: entry.code,
      },
    ],
  };

  return NextResponse.json(registryItem, {
    headers: { "Content-Type": "application/json" },
  });
}
