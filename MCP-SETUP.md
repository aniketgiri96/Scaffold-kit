# Tools needed to set up MCP for this codebase

This document summarizes the runtime, dependencies, and IDE configuration needed to run and use the Scaffold-kit MCP server from this codebase.

## 1. Runtime and package manager

- **Node.js** — Version **18 or higher** (see `package.json` `engines.node`). The MCP server is a Node script (`mcp.mjs`) run via `process.execPath` in `cli.js`.
- **npm** (or **pnpm** / **yarn**) — Used to install dependencies and to run the server via `npx ai-scaffold-kit mcp` or after a global/local install of the `ai-scaffold-kit` package.

No extra global binaries are required; the server is started with `node mcp.mjs` (via the CLI) or `npx ai-scaffold-kit mcp`.

## 2. Dependencies (already in the repo)

The MCP server only relies on two packages that are already in `package.json`:

| Dependency                            | Purpose in MCP                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
| `@modelcontextprotocol/sdk` (^1.26.0) | `McpServer`, `StdioServerTransport` — MCP server and stdio transport in `mcp.mjs`.          |
| `zod` (^4.3.6)                        | Input schemas for tool parameters (e.g. `slug`, `format`) in `mcp.mjs`.                     |

Running `npm install` (or your package manager's equivalent) in the project root is enough; no extra "MCP-only" install step is needed.

## 3. IDE and MCP config

- **An MCP-capable client** — e.g. Cursor, Claude Desktop, Windsurf, or Continue.
- **MCP config file** — So the IDE spawns this server over stdio:
  - **Cursor:** `~/.cursor/mcp.json` or project `.cursor/mcp.json`
  - **Claude Desktop / Windsurf / Continue:** Same `command` / `args` / `env`; config path is IDE-specific (see each IDE's MCP docs).

Example entry to add under `mcpServers` (e.g. in Cursor's `mcp.json`):

```json
"scaffold-kit": {
  "command": "npx",
  "args": ["ai-scaffold-kit", "mcp"],
  "env": {
    "SCAFFOLD_KIT_BASE_URL": "https://www.techwithcare.in"
  }
}
```

For a **local** Scaffold-kit instance, set `SCAFFOLD_KIT_BASE_URL` to `http://localhost:3000` (or your dev server URL). The server also respects `DSP_REGISTRY_BASE` (origin only) if set.

You can copy from the example config in this repo: [.cursor/mcp.json.example](.cursor/mcp.json.example).

## 4. Optional: network access

The MCP server calls your Scaffold-kit instance over HTTP (e.g. `/api/manifest`, `/api/registry/...`, `/api/context`, `/api/tokens`, `/api/recipes`). If the base URL is remote, the machine running the IDE needs outbound HTTPS. For a local base URL, only localhost access is needed.

## 5. Summary checklist

- [ ] Node.js >= 18 installed.
- [ ] Dependencies installed (`npm install` in project root).
- [ ] IDE supports MCP and has an MCP config file.
- [ ] `mcp.json` (or equivalent) contains the `scaffold-kit` server with `command` / `args` / optional `env`.
- [ ] (Optional) Set `SCAFFOLD_KIT_BASE_URL` or `DSP_REGISTRY_BASE` if not using the default `https://www.techwithcare.in`.

No additional standalone "MCP tools" or system binaries are required beyond Node, your package manager, and the IDE's MCP configuration.

## MCP tools exposed by the server (for reference)

The server exposes these **MCP tools** (callable by the IDE's AI) so the model can use the design system:

- `get_manifest` — Catalog of components, templates, recipes.
- `get_component` — Component code by slug (e.g. `button`, `ml-model-performance-dashboard`).
- `get_template` — Template code by slug.
- `get_context` — Design system context / Cursor rule (JSON or markdown).
- `get_tokens` — Design tokens (CSS variables) snippet.
- `list_recipes` — All recipe slugs.
- `get_recipe` — Recipe details and block code by slug.
- `list_ml` — ML blocks from the manifest.

These are already implemented in `mcp.mjs`; no extra tool implementations are required to set up MCP beyond the steps above.
