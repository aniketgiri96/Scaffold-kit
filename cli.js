#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const REGISTRY_BASE =
  process.env.DSP_REGISTRY_BASE ||
  "https://www.techwithcare.in/api/registry";
const COMPONENTS_JSON = "components.json";

const defaultConfig = {
  $schema: "https://ui.shadcn.com/schema.json",
  style: "new-york",
  tailwind: {
    config: "",
    css: "src/app/globals.css",
    baseColor: "slate",
    cssVariables: true,
  },
  rsc: true,
  tsx: true,
  aliases: {
    components: "@/components",
    ui: "@/components/ui",
    utils: "@/lib/utils",
    lib: "@/lib",
    hooks: "@/hooks",
  },
  registries: {
    "@templates": `${REGISTRY_BASE}/templates/{name}.json`,
    "@ml": `${REGISTRY_BASE}/ml/{name}.json`,
    "@voice": `${REGISTRY_BASE}/voice/{name}.json`,
  },
};

function ensureComponentsJson(cwd) {
  const filePath = path.join(cwd, COMPONENTS_JSON);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify(defaultConfig, null, 2),
      "utf8"
    );
    return;
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(
      `Error: ${COMPONENTS_JSON} exists but is invalid JSON. Fix the file and try again.`
    );
    process.exit(1);
  }

  config.registries = config.registries || {};
  config.registries["@templates"] = `${REGISTRY_BASE}/templates/{name}.json`;
  config.registries["@ml"] = `${REGISTRY_BASE}/ml/{name}.json`;
  config.registries["@voice"] = `${REGISTRY_BASE}/voice/{name}.json`;

  fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf8");
}

function main() {
  const args = process.argv.slice(2);
  const subcommand = args[0];
  const passThrough = args.slice(1);

  if (subcommand === "mcp") {
    const mcpPath = path.join(__dirname, "mcp.mjs");
    const result = spawnSync(process.execPath, [mcpPath], {
      stdio: "inherit",
      env: { ...process.env },
      shell: false,
    });
    process.exit(result.status ?? 1);
  }

  if (subcommand !== "add") {
    console.error(
      'Usage: scaffold add <component> [options]  |  scaffold mcp\n  Examples:\n    scaffold add @ml/ml-model-performance-dashboard\n    scaffold mcp  (run MCP server for IDE integration)'
    );
    process.exit(1);
  }

  const cwd = process.cwd();
  ensureComponentsJson(cwd);

  const result = spawnSync(
    "npx",
    ["shadcn@latest", "add", ...passThrough],
    {
      stdio: "inherit",
      cwd,
      shell: process.platform === "win32",
    }
  );

  process.exit(result.status ?? 1);
}

main();
