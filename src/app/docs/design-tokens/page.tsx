import Link from "next/link";
import { DesignTokensSnippet } from "./snippet";

export default function DesignTokensPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Design tokens
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Copy-paste CSS variables (and optional <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.glass</code> utility) so components
          you copy from this site look consistent in your app. No dependency on this platform—you own the code.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>
            Copy the snippet below into your global CSS (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">globals.css</code> or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">app.css</code>).
          </li>
          <li>
            Ensure your Tailwind config maps theme colors to these variables (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">background: "hsl(var(--background))"</code>) if you use Tailwind.
          </li>
          <li>
            For dark mode, add the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.dark</code> class on a parent (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">html</code> or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">body</code>) when dark mode is active.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Snippet</h2>
        <p className="text-muted-foreground text-sm">
          You can also fetch this programmatically: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">GET /api/tokens</code> returns <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{"{ css, description }"}</code>.
        </p>
        <DesignTokensSnippet />
      </section>

      <p className="text-muted-foreground text-sm">
        <Link href="/docs/for-ai-developers" className="text-primary underline hover:no-underline">
          For AI developers
        </Link>{" "}
        — manifest API, Cursor/Copilot, and context.
      </p>
    </div>
  );
}
