/**
 * Recipes: ordered combinations of templates and components for full flows.
 * Exposed in GET /api/manifest so AI can assemble a full screen from one intent.
 */

export interface RecipeEntry {
  slug: string;
  name: string;
  description: string;
  /** Ordered list of template or component slugs to compose. */
  blockSlugs: string[];
  /** Layout hint for the screen (e.g. sidebar + main). */
  layoutHint?: string;
}

export const recipesRegistry: Record<string, RecipeEntry> = {
  "chat-screen": {
    slug: "chat-screen",
    name: "Chat screen",
    description:
      "Full chat UI: layout with sidebar, message rows, typing indicator, prompt input, and error retry. Compose these blocks in order for a complete chat screen.",
    blockSlugs: [
      "chat-layout",
      "chat-message-row",
      "typing-indicator",
      "prompt-input-bar",
      "message-error-retry",
    ],
    layoutHint: "sidebar + main (messages + input)",
  },
  "ai-chat-full": {
    slug: "ai-chat-full",
    name: "AI chat (full playground)",
    description:
      "Full-page-style AI chat with model selector, messages, code blocks, errors, typing indicator, suggested prompts, and prompt bar with attachments. Use ai-chat-playground template for all-in-one, or compose blocks for custom order.",
    blockSlugs: [
      "ai-chat-playground",
    ],
    layoutHint: "single column, header + scroll + footer",
  },
  "minimal-chat": {
    slug: "minimal-chat",
    name: "Minimal chat",
    description: "Minimal chat: message rows + prompt input bar. Add typing-indicator and message-error-retry as needed.",
    blockSlugs: ["chat-message-row", "prompt-input-bar"],
    layoutHint: "scroll area + fixed input at bottom",
  },
};
