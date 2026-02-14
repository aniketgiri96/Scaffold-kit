# Design System Platform

A **one-stop UI kit for AI developers**: copy-paste components and AI patterns (chat UIs, prompts, agents) with consistent imports. Built with Radix UI and Tailwind CSS. Works with Cursor and Copilot.

## What’s in the kit

- **Components** — Primitives (buttons, inputs, dialogs, forms, etc.). Browse and copy from the Code tab on each component page.
- **Templates** — AI-oriented blocks and full-page layouts: chat message row, prompt input bar, AI response card, typing indicator, tool-call display, suggested prompts, full chat playground, and more.

## Quick start

1. Run the app: `npm run dev` (or `pnpm dev` / `yarn dev` / `bun dev`) and open [http://localhost:3000](http://localhost:3000).
2. Open **Components** or **Templates**, pick an item, switch to the **Code** tab, and copy the snippet into your project.
3. Use the import path `@/components/ui/<name>` for components (e.g. `@/components/ui/button`). Ensure your project’s path alias `@/` points to your `src` (or adjust the copied imports).

## Using with Cursor / Copilot

Open a component or template page on this site, switch to the **Code** tab, and copy the code. You can also use the manifest API: `GET /api/manifest` returns a JSON catalog of all components and templates for AI tools.

## Docs

- **Introduction** — [/docs](/docs)
- **For AI developers** — [/docs/for-ai-developers](/docs/for-ai-developers)

## Tech stack

Next.js, React, Radix UI, Tailwind CSS, Framer Motion.
