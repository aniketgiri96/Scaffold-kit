import { NextResponse } from "next/server";
import { mlRegistry } from "@/registry/ml-registry";

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

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: entry.slug,
    type: "registry:block" as const,
    title: entry.name,
    description: entry.description,
    registryDependencies: [],
    files: [
      {
        path: `ml/${entry.slug}.tsx`,
        type: "registry:block" as const,
        content: entry.code,
      },
    ],
  };

  return NextResponse.json(registryItem, {
    headers: { "Content-Type": "application/json" },
  });
}
