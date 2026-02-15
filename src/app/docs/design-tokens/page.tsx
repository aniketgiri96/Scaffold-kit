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
        <h2 className="text-xl font-semibold tracking-tight">Chat theming (plug-and-play)</h2>
        <p className="text-muted-foreground">
          Chat templates (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">chat-layout</code>, <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">chat-message-row</code>) use CSS variables so you can theme bubbles and spacing without changing component code. Override these in your global CSS or on a wrapper (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">[data-chat-theme=&quot;custom&quot;]</code>) for scoped themes.
        </p>
        <ul className="list-disc space-y-1 pl-6 text-muted-foreground text-sm">
          <li><code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-user-bg</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-user-text</code> — user bubble</li>
          <li><code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-assistant-bg</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-assistant-text</code> — assistant bubble</li>
          <li><code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-bubble-radius</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-message-gap</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono">--chat-bubble-max-width</code> — layout</li>
        </ul>
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
