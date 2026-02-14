# Design System Platform

A **one-stop UI kit for AI developers**: copy-paste components and AI patterns (chat UIs, prompts, agents) with consistent imports. Built with Radix UI and Tailwind CSS. Works with Cursor and Copilot.

## What’s in the kit

- **Components** — Primitives (buttons, inputs, dialogs, forms, etc.). Browse and copy from the Code tab on each component page.
- **Templates** — AI-oriented blocks and full-page layouts: chat message row, prompt input bar, AI response card, typing indicator, tool-call display, suggested prompts, full chat playground, and more.

## Quick start

1. Run the app: `npm run dev` (or `pnpm dev` / `yarn dev` / `bun dev`) and open [http://localhost:3000](http://localhost:3000).
2. Open **Components** or **Templates**, pick an item, switch to the **Code** tab, and copy the snippet into your project.
3. Use the import path `@/components/ui/<name>` for components (e.g. `@/components/ui/button`). Ensure your project’s path alias `@/` points to your `src` (or adjust the copied imports).

## Use in your repo

To add components, templates, or ML blocks **from your own app repo** (without cloning this platform), run the CLI from your project root. No need to edit `components.json` manually—the CLI will create or update it with the required registries, then install the component.

### Recommended: one command (auto-config + install)

From your project root, run (no manual setup required).

**If this repo is not published to npm**, use the GitHub URL:

```bash
npx github:aniketgiri96/Scaffold-kit add @ml/ml-model-performance-dashboard
```

**If the package is published to npm** (`ai-scaffold-kit`), install it (optional) then run the add command:

```bash
npm i ai-scaffold-kit
npx ai-scaffold-kit add @ml/ml-model-performance-dashboard
```

Or run without installing (npx fetches on demand):

```bash
npx ai-scaffold-kit add @ml/ml-model-performance-dashboard
```

Other examples (use the same prefix—GitHub or `ai-scaffold-kit`—as above):

- **ML blocks:** `... add @ml/<slug>` (e.g. `@ml/ml-model-performance-dashboard`)
- **Templates:** `... add @templates/<slug>` (e.g. `@templates/chat-message-row`)
- **Shadcn primitives:** `... add button` (etc.)

The CLI ensures `components.json` exists and contains the `@ml` and `@templates` registries, then runs the add.

**Registry URL:** The CLI defaults to `https://scaffold-kit-zeta.vercel.app/api/registry`. That host must be a deployment of **this repo** (Scaffold-kit) so that `/api/registry/ml/...` and `/api/registry/templates/...` work. If you get "item was not found" or 404, deploy this app to Vercel (or your host), then either redeploy at that URL or point the CLI at your deployment: `DSP_REGISTRY_BASE=https://your-app.vercel.app/api/registry npx ai-scaffold-kit add @ml/...`. For local development, set `DSP_REGISTRY_BASE=http://localhost:3000/api/registry` and run this app with `npm run dev` in another terminal.

### Alternative: manual one-time setup

If you prefer to add the script and registries yourself (or use `pnpm ui:add` / `npm run ui:add`), do the following once in your project.

1. **Add the CLI script** to your `package.json`:
   ```json
   "scripts": {
     "ui:add": "shadcn@latest add"
   }
   ```

2. **Configure registries** so the CLI can resolve `@ml/` and `@templates/`:
   - **If you don't have a `components.json`:** Create one at your project root. You can copy [components.consumer.json](components.consumer.json) from this repo, or use a minimal config that includes the `$schema`, `registries`, and `aliases` (see that file for the full block).
   - **If you already have `components.json`** (e.g. from shadcn): Add this `registries` block (merge with any existing `registries`):
     ```json
     "registries": {
       "@templates": "https://scaffold-kit-zeta.vercel.app/api/registry/templates/{name}.json",
       "@ml": "https://scaffold-kit-zeta.vercel.app/api/registry/ml/{name}.json"
     }
     ```

3. **Optional:** For a local design system instance, point registries to `http://localhost:3000/api/registry/...` instead of the Vercel URL above.

**Don't have a `components/ui` folder?** You don't need to create it. The shadcn CLI creates the target directory when you add your first component. Ensure your `components.json` includes the same `aliases` (e.g. `"ui": "@/components/ui"`) so the CLI knows where to write; see [components.consumer.json](components.consumer.json) for a full example. If your app uses a different structure (e.g. no `src/`, or components elsewhere), set `aliases.ui` and related keys to match—the CLI will still create missing directories on first add.

### Adding components (after setup)

From your project root:

- **ML blocks:** `pnpm ui:add @ml/<slug>` or `npm run ui:add @ml/<slug>` (e.g. `@ml/ml-model-performance-dashboard`)
- **Templates:** `pnpm ui:add @templates/<slug>` or `npm run ui:add @templates/<slug>` (e.g. `@templates/chat-message-row`)
- **Shadcn primitives:** `pnpm ui:add button` or `npm run ui:add button` (etc.)

**Without adding the script:** You can run `npx shadcn@latest add @ml/ml-model-performance-dashboard` (and other commands) as long as your `components.json` has the registries above.

**"Command ui:add not found"?** With **npm** you must use `npm run ui:add` (not `npm ui:add`). With pnpm/yarn you can use `pnpm ui:add` or `yarn ui:add`. If the script is still not found, you're likely in a project that hasn't had the one-time setup—add the `ui:add` script to that project's `package.json` (step 1 above).

## Installing UI components (shadcn CLI)

To add components from **your own repo**, do the one-time setup in [Use in your repo](#use-in-your-repo), then run the commands below.

You can add shadcn/ui components directly from the CLI. New components are written to `src/components/ui/` and use the existing `@/lib/utils` and theme.

- **Add one component:** `npx shadcn@latest add <component-name>` or `pnpm ui:add <component-name>`
- **Add multiple:** `npx shadcn@latest add button card dialog`
- **List available components:** `npx shadcn@latest add` (no args shows the list)
- **Overwrite existing:** `npx shadcn@latest add button --overwrite` (use with care)

Existing components in `src/components/ui/` (e.g. button, card) include custom styling (glow, backdrop-blur). Adding the same component **without** `--overwrite` skips the file; **with** `--overwrite` replaces it and removes those customizations. Prefer using the CLI for components you don't have yet; for existing ones, avoid overwriting or re-apply customizations after a one-time overwrite.

**Templates and ML blocks** can also be installed via the CLI using the project's custom registries. **First-time use from your own repo** requires the one-time setup in [Use in your repo](#use-in-your-repo) (script + registries in your project). Run the app locally if you point registries to localhost, or use the deployed app URL.

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

## Publishing (maintainers)

To publish the CLI to npm: bump version in `package.json`, update `CHANGELOG.md` with the new version and changes, then run `npm login` and `npm publish --access public` from the repo root. If you use a scoped package name, run `npm publish --access public`; for an unscoped name like `ai-scaffold-kit`, `npm publish` is enough.
