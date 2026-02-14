import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          This UI kit is a one-stop solution for AI developers: copy-paste
          components and AI patterns (chat UIs, prompts, agents) with
          consistent imports and Cursor/Copilot-friendly workflows.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          What’s in the kit
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Components</strong> — Primitives
            (buttons, inputs, dialogs, etc.) built with Radix UI and Tailwind.
            Browse and copy from the Code tab on each component page.
          </li>
          <li>
            <strong className="text-foreground">Templates</strong> — AI-oriented
            blocks and full-page layouts (chat message row, prompt input bar, AI
            response card, typing indicator, tool-call display, and more). See{" "}
            <Link href="/templates" className="text-primary underline hover:no-underline">
              Templates
            </Link>{" "}
            for the full list.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          How to use
        </h2>
        <p className="text-muted-foreground">
          Use the import path <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">@/components/ui/&lt;name&gt;</code> for
          components (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">@/components/ui/button</code>). Copy
          the code from the component or template detail page and paste into your
          project; adjust the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">@/</code> alias to match your
          setup if needed.
        </p>
        <p className="text-muted-foreground">
          For AI-assisted workflows and the machine-readable catalog, see{" "}
          <Link href="/docs/for-ai-developers" className="text-primary underline hover:no-underline">
            For AI developers
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
