# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
