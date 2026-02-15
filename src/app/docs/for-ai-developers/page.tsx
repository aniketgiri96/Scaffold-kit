import Link from "next/link";

export default function ForAiDevelopersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          For AI developers
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Use this UI kit with Cursor, Copilot, or any AI coding assistant:
          discover components, templates, and ML blocks, then copy production-ready code.
        </p>
        <p className="mt-2 text-muted-foreground">
          <strong className="text-foreground">Zero dependency.</strong> Copy code into your repo—no
          design-system package to install or upgrade. You own the code.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Using with Cursor / Copilot
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>
            Open a component, template, or ML block page (e.g.{" "}
            <Link href="/components/button" className="text-primary underline hover:no-underline">
              Components → Button
            </Link>
            ,{" "}
            <Link href="/templates/prompt-input-bar" className="text-primary underline hover:no-underline">
              Templates → Prompt input bar
            </Link>
            ,{" "}
            <Link href="/ml/ml-model-performance-dashboard" className="text-primary underline hover:no-underline">
              ML → ML Model Performance Dashboard
            </Link>
            ).
          </li>
          <li>
            Switch to the <strong className="text-foreground">Code</strong> tab.
          </li>
          <li>
            Copy the snippet and paste it into your app. Imports use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">@/components/ui/&lt;name&gt;</code>;
            ensure your project has the same alias or update the paths.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Manifest API for AI tools
        </h2>
        <p className="text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">GET /api/manifest</code> returns a
          JSON catalog of all components, templates, ML blocks, and recipes for use by AI tools. The
          response includes:
        </p>
        <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">components</strong> — slug, name,
            description, category, importPath, code, and optional examples (title
            + code). When present: props, dependencies, whenToUse, alternatives.
          </li>
          <li>
            <strong className="text-foreground">templates</strong> — slug, name,
            description, type (block or page), code, optional examples, and when present patternCategory (e.g. Streaming, Tool use).
          </li>
          <li>
            <strong className="text-foreground">ml</strong> — ML blocks (slug, name, description, type, category, code, optional examples). Use for dashboards, charts, model management, training, inference, etc. Install with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">npx ai-scaffold-kit add @ml/&lt;slug&gt;</code>; see{" "}
            <Link href="/ml" className="text-primary underline hover:no-underline">ML Components</Link> for the list.
          </li>
          <li>
            <strong className="text-foreground">recipes</strong> — slug, name, description, blockSlugs (ordered), layoutHint. Use for full-screen flows; <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">GET /api/recipes/&lt;slug&gt;</code> returns blocks with code for each.
          </li>
        </ul>
        <p className="text-muted-foreground">
          You can fetch the manifest from the same origin as this site (e.g.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">https://yoursite.com/api/manifest</code>)
          to let an AI assistant list and suggest components and templates with
          correct copy-paste snippets.
        </p>
        <p className="text-muted-foreground">
          Optional: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">?version=0.3.0</code> or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">Accept: application/vnd.design-system.v1+json</code> for versioned responses.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Context and Cursor rule
        </h2>
        <p className="text-muted-foreground">
          A curated context block tells an AI assistant which components and templates to use and when.
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm ml-1">GET /api/context</code> returns{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{"{ markdown, cursorRule }"}</code>.
          Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">?format=markdown</code> for plain markdown.
        </p>
        <p className="text-muted-foreground">
          For Cursor: add a project rule (e.g. in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.cursor/rules</code>) or paste the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">cursorRule</code> from the response so the assistant uses this design system when building UI.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          MCP server (all IDEs)
        </h2>
        <p className="text-muted-foreground">
          Use the design system from <strong className="text-foreground">any MCP-capable IDE</strong> (Cursor, Claude Desktop, Windsurf, Continue, etc.) by adding the Scaffold-kit MCP server. The server exposes tools: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">get_manifest</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">get_component</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">get_template</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">get_context</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">get_tokens</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">list_recipes</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">get_recipe</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">list_ml</code>.
        </p>
        <p className="text-muted-foreground">
          Run: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">npx ai-scaffold-kit mcp</code>. Configure your IDE to spawn this with stdio using the same <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">command</code> / <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">args</code> / <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">env</code> below (config file location is IDE-specific).
        </p>
        <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
          <li><strong className="text-foreground">Cursor:</strong> <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">~/.cursor/mcp.json</code> or project <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.cursor/mcp.json</code></li>
          <li><strong className="text-foreground">Claude Desktop:</strong> app config directory (see Claude Desktop docs)</li>
          <li><strong className="text-foreground">Windsurf / Continue:</strong> same config; see each IDE’s MCP docs for the config path</li>
        </ul>
        <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
{`// Example: Cursor mcp.json — add to mcpServers
"scaffold-kit": {
  "command": "npx",
  "args": ["ai-scaffold-kit", "mcp"],
  "env": {
    "SCAFFOLD_KIT_BASE_URL": "https://www.techwithcare.in"
  }
}

// Local instance: use "http://localhost:3000" for SCAFFOLD_KIT_BASE_URL`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Design tokens (copy-paste)
        </h2>
        <p className="text-muted-foreground">
          Paste design tokens (CSS variables for colors, radius, glass) so copied components look consistent.
          Fetch <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">GET /api/tokens</code> for a
          ready-to-paste CSS snippet, or see{" "}
          <Link href="/docs/design-tokens" className="text-primary underline hover:no-underline">
            Design tokens
          </Link>{" "}
          for the full snippet and usage.
        </p>
      </section>
    </div>
  );
}
