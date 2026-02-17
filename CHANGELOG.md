# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-02-17

### Minor change

- **ElevenLabs UI components in Components section:** Added 13 ElevenLabs UI components to the Components section (Voice category): bar-visualizer, conversation, live-waveform, message, mic-selector, orb, response, shimmering-text, speech-input, transcript-viewer, voice-button, voice-picker, waveform. Each has a demo wrapper, registry entry, and install command `pnpm dlx @elevenlabs/cli@latest components add <slug>` on the component detail page.

## [0.8.0] - 2026-02-15

### Minor change

- **Chat layout UI:** User messages align right, assistant messages left. Sidebar conversation list includes a per-conversation delete (dropdown with "Delete"). Micro-animations (Framer Motion) for message enter and conversation remove. New `ChatMessageRow`, `ChatConversationItem`, and `ChatLayout` in `src/features/chat`; registry templates `chat-message-row` and `chat-layout` use them and ship copy-paste code with motion and dropdown.
- **Chat theming (plug-and-play):** CSS variables `--chat-user-bg`, `--chat-user-text`, `--chat-assistant-bg`, `--chat-assistant-text`, `--chat-bubble-radius`, `--chat-message-gap`, `--chat-bubble-max-width` in `globals.css` and design tokens. Override in app CSS or a `[data-chat-theme]` wrapper to theme chat without changing components. Design tokens doc updated with a "Chat theming" subsection.
- **AI chat playground:** Same enhancements as chat layout: user messages right, assistant left; header dropdown with "Clear chat"; Framer Motion micro-animations; `--chat-*` theme variables. New `AIChatPlayground` in `src/features/chat`; registry template and copy-paste code updated.

## [0.7.0] - 2026-02-14

### Minor change

- **MCP server:** Expose an MCP server for use in any MCP-capable IDE (Cursor, Claude Desktop, Windsurf, Continue, etc.). Run `npx ai-scaffold-kit mcp` and add the server to your IDE’s MCP config (stdio). Tools: `get_manifest`, `get_component`, `get_template`, `get_context`, `get_tokens`, `list_recipes`, `get_recipe`. Configurable via `SCAFFOLD_KIT_BASE_URL` or `DSP_REGISTRY_BASE`. Documented in README and For AI developers.

## [0.6.0] - 2026-02-14

### Minor change

- **npm publish:** CLI is now publishable to npm. Use `npx ai-scaffold-kit add @ml/<slug>` or `npx ai-scaffold-kit add @templates/<slug>` from your project root. Package includes only `cli.js` and README; registry is served from the deployed app. Publish with `npm publish --access public` for the scoped package.

## [0.5.1] - 2026-02-14

### UI change

- **Primary color refresh:** Replaced high-saturation blue/cyan primary with a softer teal palette (hue 175, ~70% saturation) for an eye-friendly, rich look. Updated `--primary`, `--ring`, `--accent`, `--accent-foreground`, `--chart-1`, `--glow-primary`, and `--gradient-accent` in both light and dark themes in `globals.css` and design tokens.

## [0.5.0] - 2026-02-14

### Minor change

- **ML section:** New top-level `/ml` section with its own registry and category-based grouping. ML components are separate from Templates and include Dashboards, Charts, Model Management, Data, Training, Inference, LLM/NLP, Computer Vision, Utilities, Reporting, and Status.
- **ML Phase 1 components:** ML Model Performance Dashboard (accuracy, F1, loss, accuracy-over-epochs chart), Resource Usage Dashboard (GPU/CPU/Memory with progress bars), Training Loss/Accuracy Curves (dual-axis Recharts), Confusion Matrix Heatmap, ROC/AUC Curve Display. All use mock data and design-system tokens.
- **Recharts:** Added `recharts` for chart components. Chart theme in `src/features/ml/shared/chart-theme.tsx` uses CSS variables `--chart-1`–`--chart-5` (defined in `globals.css` for light/dark) so charts stay on-brand.
- **Nav:** Added "ML" link to main navbar pointing to `/ml`.

## [0.4.0] - 2026-02-14

### Minor change

- **Manifest API (richer):** Components and templates now expose optional `props`, `dependencies`, `whenToUse`, and `alternatives` for AI reasoning. Templates include `patternCategory` (e.g. Streaming, Tool use, Chat). Versioned manifest: `?version=0.3.0` or `Accept: application/vnd.design-system.v1+json`; response includes `X-Design-System-Version`.
- **Recipes:** New registry and manifest section for pattern combos (e.g. chat-screen = chat-layout + chat-message-row + typing-indicator + prompt-input-bar + message-error-retry). Templates page shows a Recipes section and links to `/recipes/[slug]`. `GET /api/recipes` and `GET /api/recipes/[slug]` return recipe metadata and per-block code for full-screen assembly.
- **AI patterns in nav:** Templates are grouped by AI pattern category (Chat, Prompt input, Streaming, Tool use, Errors & retry, Layout) on the Templates page with pattern badges.
- **Design tokens:** `GET /api/tokens` returns copy-paste CSS variables (and `.glass` utility). New doc page `/docs/design-tokens` with snippet and usage; linked from For AI developers.
- **Zero-dependency messaging:** README and For AI developers doc now state clearly that copy-paste means no design-system package—you own the code.
- **Context and Cursor rule:** `GET /api/context` returns curated markdown context and a `cursorRule` snippet for Cursor/Copilot. Documented in For AI developers.

## [0.3.0] - 2025-02-14

### Minor change

- Repositioned as one-stop UI kit for AI developers. Updated home hero and README with AI-developer messaging and copy-paste + Cursor/Copilot workflow.
- **Docs:** Added `/docs` (Introduction) and `/docs/for-ai-developers` (usage with Cursor/Copilot and manifest API). Updated docs config sidebar.
- **Manifest API:** Added `GET /api/manifest` returning a JSON catalog of all components and templates (slug, name, description, category/type, importPath where applicable, code, and optional examples) for use by AI tools.
- **Home:** Added “AI patterns” section below the hero with a grid of 6 template cards linking to Templates; secondary CTA now points to Templates (“AI patterns”). Removed Examples from nav and footer (rely on Components + Templates + Docs).

## [0.2.0] - 2025-02-13

### UI change

- Component UI is now fully visible in both dark and light mode. Replaced hardcoded dark-only classes (`border-white/10`, `bg-black/20`, etc.) with semantic theme tokens (`border-border`, `bg-muted`, `bg-card`, `bg-popover`, etc.) across component preview, components list page, sidebar, navbar, home page, and all base UI components.
- Preview and code blocks in component docs use theme-aware backgrounds and text for consistent readability in either theme.

### Minor change

- **Component categories:** Every registry component now has a category (Forms, Data display, Layout, Navigation, Overlay, Feedback). The components list page and sidebar group components by these categories.
- **Example sections:** Component pages support multiple example sections (e.g. Default, Sizes, With icon). Added optional `examples` to the registry and render a heading plus preview per example. Button, Card, and Input include extra example sections (Sizes, With icon; With form; Disabled, With button).

### Fix

- Hero heading and outline button on the home page use theme-aware gradients and backgrounds so they remain visible in light mode.

---

## [0.1.0] - (initial)

- Initial release.
