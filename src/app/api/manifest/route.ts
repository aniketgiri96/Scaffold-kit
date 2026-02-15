import { NextRequest, NextResponse } from "next/server";
import { registry } from "@/registry";
import { templatesRegistry } from "@/registry/templates";
import { recipesRegistry } from "@/registry/recipes";
import { mlRegistry } from "@/registry/ml-registry";
import { componentManifestMeta, templateManifestMeta } from "@/registry/manifest-meta";

export const dynamic = "force-dynamic";

const MANIFEST_VERSION = "0.4.0";
const MEDIA_TYPE = "application/vnd.design-system.v1+json";

function getRequestedVersion(request: NextRequest): string | null {
  const url = new URL(request.url);
  const versionParam = url.searchParams.get("version");
  if (versionParam) return versionParam;
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes(MEDIA_TYPE)) return MANIFEST_VERSION;
  return null;
}

export async function GET(request: NextRequest) {
  const requestedVersion = getRequestedVersion(request);

  const components = Object.entries(registry).map(([slug, entry]) => {
    const meta = componentManifestMeta[slug];
    return {
      slug,
      name: entry.name,
      description: entry.description,
      category: entry.category,
      importPath: `@/components/ui/${slug}`,
      code: entry.code,
      ...(entry.examples?.length && {
        examples: entry.examples.map((ex) => ({ title: ex.title, code: ex.code })),
      }),
      ...(meta && {
        props: meta.props,
        dependencies: meta.dependencies,
        whenToUse: meta.whenToUse,
        alternatives: meta.alternatives,
      }),
    };
  });

  const templates = Object.entries(templatesRegistry).map(([slug, entry]) => {
    const meta = templateManifestMeta[slug];
    return {
      slug,
      name: entry.name,
      description: entry.description,
      type: entry.type,
      code: entry.code,
      ...(entry.examples?.length && {
        examples: entry.examples.map((ex) => ({ title: ex.title, code: ex.code })),
      }),
      ...(meta && {
        props: meta.props,
        dependencies: meta.dependencies,
        whenToUse: meta.whenToUse,
        alternatives: meta.alternatives,
        patternCategory: meta.patternCategory,
      }),
    };
  });

  const recipes = Object.entries(recipesRegistry).map(([slug, entry]) => ({
    slug: entry.slug,
    name: entry.name,
    description: entry.description,
    blockSlugs: entry.blockSlugs,
    layoutHint: entry.layoutHint,
  }));

  const ml = Object.entries(mlRegistry).map(([slug, entry]) => ({
    slug,
    name: entry.name,
    description: entry.description,
    type: entry.type,
    category: entry.category,
    code: entry.code,
    ...(entry.examples?.length && {
      examples: entry.examples.map((ex) => ({ title: ex.title, code: ex.code })),
    }),
  }));

  const payload = {
    version: MANIFEST_VERSION,
    ...(requestedVersion && { requestedVersion }),
    components,
    templates,
    recipes,
    ml,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      "X-Design-System-Version": MANIFEST_VERSION,
      "Content-Type": "application/json",
    },
  });
}
