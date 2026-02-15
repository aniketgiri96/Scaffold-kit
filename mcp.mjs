#!/usr/bin/env node
/**
 * Scaffold-kit MCP server — exposes design system manifest, components, templates,
 * context, tokens, and recipes as MCP tools for use in any MCP-capable IDE.
 *
 * Set SCAFFOLD_KIT_BASE_URL or DSP_REGISTRY_BASE (origin only) to point at your
 * Scaffold-kit instance. Default: https://www.techwithcare.in
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BASE_URL =
  process.env.SCAFFOLD_KIT_BASE_URL ||
  (process.env.DSP_REGISTRY_BASE
    ? String(process.env.DSP_REGISTRY_BASE).replace(/\/api\/registry\/?$/, "")
    : "https://www.techwithcare.in");

function apiUrl(path) {
  const base = BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

async function fetchJson(path) {
  const res = await fetch(apiUrl(path));
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

const server = new McpServer(
  {
    name: "scaffold-kit",
    version: "1.0.0",
  },
  { capabilities: { tools: {} } }
);

server.registerTool(
  "get_manifest",
  {
    title: "Get design system manifest",
    description:
      "Returns the full catalog of components, templates, and recipes from the Scaffold-kit design system. Use this to discover available items before fetching code or context.",
    inputSchema: {},
  },
  async () => {
    const data = await fetchJson("/api/manifest");
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "get_component",
  {
    title: "Get component code",
    description:
      "Returns one component's code and metadata by slug. Use slugs from the manifest (e.g. button, card, input). For ML blocks use the slug from the manifest (e.g. ml-model-performance-dashboard).",
    inputSchema: {
      slug: z.string().describe("Component slug (e.g. button, card)"),
    },
  },
  async ({ slug }) => {
    const manifest = await fetchJson("/api/manifest");
    const component = manifest.components?.find(
      (c) => c.slug === slug || c.slug === slug.replace(/^@ml\//, "")
    );
    if (component) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                slug: component.slug,
                name: component.name,
                description: component.description,
                category: component.category,
                importPath: component.importPath,
                code: component.code,
                ...(component.examples && { examples: component.examples }),
                ...(component.whenToUse && { whenToUse: component.whenToUse }),
                ...(component.alternatives && {
                  alternatives: component.alternatives,
                }),
              },
              null,
              2
            ),
          },
        ],
      };
    }
    const name = slug.replace(/\.json$/i, "").replace(/^@ml\//, "");
    try {
      const block = await fetchJson(`/api/registry/ml/${name}.json`);
      const code = block.files?.[0]?.content ?? block.content ?? JSON.stringify(block);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { slug: name, name: block.title ?? name, code },
              null,
              2
            ),
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Component not found",
              slug,
              hint: "Use get_manifest to list available component slugs.",
            }),
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "get_template",
  {
    title: "Get template code",
    description:
      "Returns one template's code and metadata by slug. Use slugs from the manifest (e.g. chat-message-row, prompt-input-bar).",
    inputSchema: {
      slug: z.string().describe("Template slug (e.g. chat-message-row)"),
    },
  },
  async ({ slug }) => {
    const manifest = await fetchJson("/api/manifest");
    const template = manifest.templates?.find((t) => t.slug === slug);
    if (template) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                slug: template.slug,
                name: template.name,
                description: template.description,
                type: template.type,
                code: template.code,
                ...(template.examples && { examples: template.examples }),
                ...(template.whenToUse && { whenToUse: template.whenToUse }),
                ...(template.alternatives && {
                  alternatives: template.alternatives,
                }),
              },
              null,
              2
            ),
          },
        ],
      };
    }
    const name = slug.replace(/\.json$/i, "");
    try {
      const data = await fetchJson(`/api/registry/templates/${name}.json`);
      const code = data.files?.[0]?.content ?? data.content ?? JSON.stringify(data);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                slug: name,
                name: data.title ?? data.name ?? name,
                code,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Template not found",
              slug,
              hint: "Use get_manifest to list available template slugs.",
            }),
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "get_context",
  {
    title: "Get design system context",
    description:
      "Returns curated context and Cursor rule for the Scaffold-kit design system. Use this to inject into the IDE or as a project rule so the AI uses the right components and templates.",
    inputSchema: {
      format: z
        .enum(["json", "markdown"])
        .optional()
        .describe("Response format: json (default) or markdown"),
    },
  },
  async ({ format }) => {
    const path =
      format === "markdown"
        ? "/api/context?format=markdown"
        : "/api/context";
    if (format === "markdown") {
      const res = await fetch(apiUrl(path));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      return {
        content: [{ type: "text", text }],
      };
    }
    const data = await fetchJson(path);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "get_tokens",
  {
    title: "Get design tokens",
    description:
      "Returns the design system CSS variables (tokens) snippet. Paste into your global stylesheet so copied components match the design system.",
    inputSchema: {},
  },
  async () => {
    const data = await fetchJson("/api/tokens");
    const text =
      typeof data.css === "string"
        ? data.css
        : JSON.stringify(data, null, 2);
    return {
      content: [
        {
          type: "text",
          text: data.description
            ? `${data.description}\n\n${text}`
            : text,
        },
      ],
    };
  }
);

server.registerTool(
  "list_recipes",
  {
    title: "List recipes",
    description:
      "Lists all recipes (ordered block compositions). Use get_recipe to fetch a recipe's blocks and code.",
    inputSchema: {},
  },
  async () => {
    const data = await fetchJson("/api/recipes");
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

server.registerTool(
  "get_recipe",
  {
    title: "Get recipe with blocks",
    description:
      "Returns a recipe's details and the code for each block by slug. Use list_recipes to get recipe slugs.",
    inputSchema: {
      slug: z.string().describe("Recipe slug (e.g. chat-screen)"),
    },
  },
  async ({ slug }) => {
    try {
      const data = await fetchJson(`/api/recipes/${slug}`);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (e) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Recipe not found",
              slug,
              hint: "Use list_recipes to list available recipe slugs.",
            }),
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "list_ml",
  {
    title: "List ML blocks",
    description:
      "Lists all ML blocks (dashboards, charts, model management, training, inference, etc.) from the manifest. Use get_component with an ML slug (e.g. ml-model-performance-dashboard) to fetch code.",
    inputSchema: {},
  },
  async () => {
    const data = await fetchJson("/api/manifest");
    const ml = data.ml ?? [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(ml, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Scaffold-kit MCP server error:", err);
  process.exit(1);
});
