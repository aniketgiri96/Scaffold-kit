# Design System Platform

A **one-stop UI kit for AI developers**: copy-paste components and AI patterns (chat UIs, prompts, agents) with consistent imports. Built with Radix UI and Tailwind CSS. Works with Cursor and Copilot.

## What’s in the kit

- **Components** — Primitives (buttons, inputs, dialogs, forms, etc.). Browse and copy from the Code tab on each component page.
- **Templates** — AI-oriented blocks and full-page layouts: chat message row, prompt input bar, AI response card, typing indicator, tool-call display, suggested prompts, full chat playground, and more.

## Quick start

1. Run the app: `npm run dev` (or `pnpm dev` / `yarn dev` / `bun dev`) and open [http://localhost:3000](http://localhost:3000).
2. Open **Components** or **Templates**, pick an item, switch to the **Code** tab, and copy the snippet into your project.
3. Use the import path `@/components/ui/<name>` for components (e.g. `@/components/ui/button`). Ensure your project’s path alias `@/` points to your `src` (or adjust the copied imports).

## Installing UI components (shadcn CLI)

You can add shadcn/ui components directly from the CLI. New components are written to `src/components/ui/` and use the existing `@/lib/utils` and theme.

- **Add one component:** `npx shadcn@latest add <component-name>` or `pnpm ui:add <component-name>`
- **Add multiple:** `npx shadcn@latest add button card dialog`
- **List available components:** `npx shadcn@latest add` (no args shows the list)
- **Overwrite existing:** `npx shadcn@latest add button --overwrite` (use with care)

Existing components in `src/components/ui/` (e.g. button, card) include custom styling (glow, backdrop-blur). Adding the same component **without** `--overwrite` skips the file; **with** `--overwrite` replaces it and removes those customizations. Prefer using the CLI for components you don't have yet; for existing ones, avoid overwriting or re-apply customizations after a one-time overwrite.

**Templates and ML blocks** can also be installed via the CLI using the project's custom registries (run the app locally first so the registry URLs in `components.json` can be reached, or point them to your deployed app URL):

- **Templates:** `pnpm ui:add @templates/<slug>` (e.g. `pnpm ui:add @templates/chat-message-row`)
- **ML:** `pnpm ui:add @ml/<slug>` (e.g. `pnpm ui:add @ml/ml-model-performance-dashboard`)

Files are written to `src/components/templates/` and `src/components/ml/` respectively. For ML blocks that depend on `@/features/ml/` shared code, you may need to add those files from the docs or code tab.

## Using with Cursor / Copilot

Open a component or template page on this site, switch to the **Code** tab, and copy the code. You can also use the manifest API: `GET /api/manifest` returns a JSON catalog of all components and templates for AI tools. Copy-paste only—no runtime dependency on this platform.

## Docs

- **Introduction** — [/docs](/docs)
- **For AI developers** — [/docs/for-ai-developers](/docs/for-ai-developers)

## Tech stack

Next.js, React, Radix UI, Tailwind CSS, Framer Motion.
