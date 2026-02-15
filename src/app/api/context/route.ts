import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Curated context block for AI assistants. Inject this (or the cursorRule) when building UI
 * so the model uses the right components and templates from this design system.
 */
const CONTEXT_MARKDOWN = `# Design system context (for AI assistants)

## Conventions
- Use components and templates from this design system. Fetch the catalog: GET /api/manifest (same origin).
- Prefer import path \`@/components/ui/<name>\` for primitives (button, input, card, etc.). Ensure the project has the \`@/\` alias or adjust paths.
- For chat UIs: use templates \`chat-message-row\`, \`prompt-input-bar\`, \`typing-indicator\`, \`message-error-retry\`, \`suggested-prompts\`. Compose with \`chat-layout\` or use recipe \`chat-screen\` (blockSlugs in order).
- For tool/agent UX: use \`tool-call-display\` for showing tool calls and results; \`agent-avatar-status\` for agent identity with status.
- For code in responses: use \`chat-code-block\` (code + language + copy button).
- For prompt input with attachments: use \`prompt-attachments\` instead of \`prompt-input-bar\`.
- For ML dashboards and training/inference UI: use ML blocks from the manifest \`ml\` array (e.g. \`ml-model-performance-dashboard\`, \`training-loss-accuracy-curves\`, \`model-card\`, \`experiment-run-table\`). Install with \`npx ai-scaffold-kit add @ml/<slug>\`.
- Design tokens: GET /api/tokens returns CSS variables; paste into globals so copied components look consistent.
- No runtime dependency on this platform: copy code into the repo; you own it.
`;

const CURSOR_RULE = `# Design system (AI UI kit)
Use the design system catalog from this project's manifest. Prefer components and templates from GET /api/manifest (same origin).
- Primitives: import from \`@/components/ui/<slug>\` (e.g. button, input, card). Use the \`code\` field from the manifest for copy-paste.
- Chat UIs: use templates chat-message-row, prompt-input-bar, typing-indicator, message-error-retry, suggested-prompts. Full flow: use recipe "chat-screen" blockSlugs or template "chat-layout" / "ai-chat-playground".
- Tool calls: use template tool-call-display. Agent identity: agent-avatar-status.
- Code in messages: use template chat-code-block.
- When suggesting a component, include the snippet from the manifest; prefer whenToUse and alternatives when choosing between similar blocks.
- ML blocks: use the manifest \`ml\` array for dashboards, charts, model management, data, training, inference, LLM/NLP, etc. Install with \`npx ai-scaffold-kit add @ml/<slug>\` (e.g. @ml/ml-model-performance-dashboard, @ml/training-loss-accuracy-curves).
- Design tokens: GET /api/tokens for CSS variables if styling must match.
`;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get("format") ?? "json";

  if (format === "markdown") {
    return new NextResponse(CONTEXT_MARKDOWN, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
  }

  return NextResponse.json(
    {
      markdown: CONTEXT_MARKDOWN,
      cursorRule: CURSOR_RULE,
      description: "Curated context for AI assistants. Use markdown for general context, cursorRule for Cursor rules or Copilot instructions.",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    }
  );
}
