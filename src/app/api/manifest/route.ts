import { NextResponse } from "next/server";
import { registry } from "@/registry";
import { templatesRegistry } from "@/registry/templates";

export const dynamic = "force-dynamic";

export async function GET() {
  const components = Object.entries(registry).map(([slug, entry]) => ({
    slug,
    name: entry.name,
    description: entry.description,
    category: entry.category,
    importPath: `@/components/ui/${slug}`,
    code: entry.code,
    ...(entry.examples?.length && {
      examples: entry.examples.map((ex) => ({ title: ex.title, code: ex.code })),
    }),
  }));

  const templates = Object.entries(templatesRegistry).map(([slug, entry]) => ({
    slug,
    name: entry.name,
    description: entry.description,
    type: entry.type,
    code: entry.code,
    ...(entry.examples?.length && {
      examples: entry.examples.map((ex) => ({ title: ex.title, code: ex.code })),
    }),
  }));

  const payload = {
    version: "0.3.0",
    components,
    templates,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
