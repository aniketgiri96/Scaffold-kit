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
          discover components and templates, then copy production-ready code.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Using with Cursor / Copilot
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>
            Open a component or template page (e.g.{" "}
            <Link href="/components/button" className="text-primary underline hover:no-underline">
              Components → Button
            </Link>
            ,{" "}
            <Link href="/templates/prompt-input-bar" className="text-primary underline hover:no-underline">
              Templates → Prompt input bar
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
          JSON catalog of all components and templates for use by AI tools. The
          response includes:
        </p>
        <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">components</strong> — slug, name,
            description, category, importPath, code, and optional examples (title
            + code).
          </li>
          <li>
            <strong className="text-foreground">templates</strong> — slug, name,
            description, type (block or page), code, and optional examples.
          </li>
        </ul>
        <p className="text-muted-foreground">
          You can fetch the manifest from the same origin as this site (e.g.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">https://yoursite.com/api/manifest</code>)
          to let an AI assistant list and suggest components and templates with
          correct copy-paste snippets.
        </p>
      </section>
    </div>
  );
}
