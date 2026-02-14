import { NextResponse } from "next/server";
import { DESIGN_TOKENS_CSS } from "@/registry/design-tokens";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      description: "CSS variables and optional .glass utility. Paste into your global stylesheet so copied components match this design system.",
      css: DESIGN_TOKENS_CSS,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    }
  );
}
