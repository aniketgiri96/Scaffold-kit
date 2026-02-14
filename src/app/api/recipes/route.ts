import { NextResponse } from "next/server";
import { recipesRegistry } from "@/registry/recipes";

export const dynamic = "force-dynamic";

export async function GET() {
  const recipes = Object.entries(recipesRegistry).map(([slug, entry]) => ({
    slug: entry.slug,
    name: entry.name,
    description: entry.description,
    blockSlugs: entry.blockSlugs,
    layoutHint: entry.layoutHint,
  }));

  return NextResponse.json(
    { recipes },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    }
  );
}
