import { NextResponse } from "next/server";
import { recipesRegistry } from "@/registry/recipes";
import { templatesRegistry } from "@/registry/templates";
import { registry as componentsRegistry } from "@/registry";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const recipe = recipesRegistry[slug];

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  const blocks = recipe.blockSlugs.map((blockSlug) => {
    const template = templatesRegistry[blockSlug];
    const component = componentsRegistry[blockSlug];
    if (template) {
      return {
        slug: blockSlug,
        name: template.name,
        type: "template" as const,
        code: template.code,
      };
    }
    if (component) {
      return {
        slug: blockSlug,
        name: component.name,
        type: "component" as const,
        code: component.code,
      };
    }
    return {
      slug: blockSlug,
      name: blockSlug,
      type: "unknown" as const,
      code: null,
    };
  });

  return NextResponse.json(
    {
      slug: recipe.slug,
      name: recipe.name,
      description: recipe.description,
      blockSlugs: recipe.blockSlugs,
      layoutHint: recipe.layoutHint,
      blocks,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    }
  );
}
