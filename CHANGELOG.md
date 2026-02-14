# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
