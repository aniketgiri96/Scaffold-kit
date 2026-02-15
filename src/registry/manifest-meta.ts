import type { ComponentManifestMeta, TemplateManifestMeta } from "./manifest-types";

/**
 * Optional manifest metadata for components.
 * Keys are registry slugs. Omitted slugs are still included in the manifest without this metadata.
 */
export const componentManifestMeta: Record<string, ComponentManifestMeta> = {
  button: {
    props: [
      { name: "variant", type: "default | secondary | outline | ghost | destructive", required: false, description: "Visual style" },
      { name: "size", type: "default | sm | lg | icon", required: false, description: "Button size" },
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
    ],
    dependencies: ["@/components/ui/button"],
    whenToUse: "Use for primary and secondary actions, form submit, or navigation. Prefer default variant for primary CTA.",
    alternatives: [],
  },
  input: {
    props: [
      { name: "type", type: "string", required: false, description: "HTML input type" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "value", type: "string", required: false, description: "Controlled value" },
      { name: "onChange", type: "ChangeEventHandler", required: false, description: "Change handler" },
    ],
    dependencies: ["@/components/ui/input"],
    whenToUse: "Use for single-line text input. For multi-line or chat prompts use the Prompt input bar template instead.",
    alternatives: ["prompt-input-bar"],
  },
  textarea: {
    props: [
      { name: "placeholder", type: "string", required: false },
      { name: "rows", type: "number", required: false },
      { name: "value", type: "string", required: false },
      { name: "onChange", type: "ChangeEventHandler", required: false },
    ],
    dependencies: ["@/components/ui/textarea"],
    whenToUse: "Use for multi-line text. For AI chat input prefer the Prompt input bar or Prompt with attachments template.",
    alternatives: ["prompt-input-bar", "prompt-attachments"],
  },
};

/**
 * Optional manifest metadata for templates, including AI pattern category.
 */
export const templateManifestMeta: Record<string, TemplateManifestMeta> = {
  "chat-message-row": {
    props: [
      { name: "role", type: "user | assistant", required: true, description: "Message sender (user = right, assistant = left)" },
      { name: "content", type: "string", required: true, description: "Message text" },
      { name: "className", type: "string", required: false, description: "Optional class for the row" },
    ],
    dependencies: ["@/components/ui/avatar", "framer-motion", "@/lib/utils"],
    whenToUse: "Use for each message in a chat thread. User messages align right, assistant left. Themed via --chat-* CSS variables.",
    alternatives: [],
    patternCategory: "Chat",
  },
  "prompt-input-bar": {
    props: [],
    dependencies: ["@/components/ui/button", "@/components/ui/textarea", "lucide-react"],
    whenToUse: "Use for the main chat input area. Prefer this over a raw Textarea for AI prompts.",
    alternatives: ["prompt-attachments"],
    patternCategory: "Prompt input",
  },
  "typing-indicator": {
    props: [],
    dependencies: [],
    whenToUse: "Show while the assistant is generating a response (streaming or thinking).",
    alternatives: ["response-loading-skeleton"],
    patternCategory: "Streaming",
  },
  "response-loading-skeleton": {
    props: [],
    dependencies: ["@/components/ui/avatar", "@/components/ui/skeleton"],
    whenToUse: "Alternative to typing indicator: skeleton lines while waiting for AI response.",
    alternatives: ["typing-indicator"],
    patternCategory: "Streaming",
  },
  "tool-call-display": {
    props: [
      { name: "name", type: "string", required: true, description: "Tool name (e.g. get_weather)" },
      { name: "args", type: "string", required: false, description: "Serialized arguments" },
      { name: "result", type: "string", required: false, description: "Serialized result" },
    ],
    dependencies: ["@/components/ui/card", "@/components/ui/collapsible", "lucide-react"],
    whenToUse: "Use when displaying agent tool calls and results in the chat thread.",
    alternatives: [],
    patternCategory: "Tool use",
  },
  "message-error-retry": {
    props: [
      { name: "message", type: "string", required: true },
      { name: "onRetry", type: "() => void", required: false },
      { name: "onDismiss", type: "() => void", required: false },
    ],
    dependencies: ["@/components/ui/alert", "@/components/ui/button", "@/components/ui/avatar", "lucide-react"],
    whenToUse: "Use when a message request failed; offers Retry and Dismiss.",
    alternatives: [],
    patternCategory: "Errors & retry",
  },
  "chat-code-block": {
    props: [
      { name: "code", type: "string", required: true },
      { name: "language", type: "string", required: false, description: "Language label (e.g. ts, js)" },
    ],
    dependencies: ["@/components/ui/button", "@/components/ui/badge", "lucide-react"],
    whenToUse: "Use for code snippets inside AI responses, with copy button.",
    alternatives: [],
    patternCategory: "Chat",
  },
  "suggested-prompts": {
    props: [
      { name: "prompts", type: "string[]", required: true },
      { name: "onSelect", type: "(p: string) => void", required: false },
    ],
    dependencies: ["@/components/ui/button"],
    whenToUse: "Use for quick-reply or suggested follow-up prompts below the input or after a response.",
    alternatives: [],
    patternCategory: "Prompt input",
  },
  "chat-layout": {
    props: [
      { name: "onDeleteConversation", type: "(id: string) => void", required: false, description: "Called when a conversation is deleted from the sidebar" },
    ],
    dependencies: ["@/components/ui/button", "@/components/ui/input", "@/components/ui/avatar", "@/components/ui/scroll-area", "@/components/ui/dropdown-menu", "framer-motion", "lucide-react", "@/lib/utils"],
    whenToUse: "Full chat UI: sidebar with delete-per-conversation, message list (user right / assistant left), prompt input. Uses --chat-* theme variables and micro-animations.",
    alternatives: ["ai-chat-playground", "ai-assistant-panel"],
    patternCategory: "Layout",
  },
  "ai-assistant-panel": {
    props: [
      { name: "open", type: "boolean", required: true },
      { name: "onOpenChange", type: "(v: boolean) => void", required: true },
    ],
    dependencies: ["@/components/ui/sheet", "@/components/ui/input", "@/components/ui/avatar", "@/components/ui/scroll-area", "lucide-react"],
    whenToUse: "Floating or slide-out panel for an AI assistant. Use when chat is secondary to main content.",
    alternatives: ["chat-layout", "ai-chat-playground"],
    patternCategory: "Layout",
  },
  "ai-chat-playground": {
    props: [
      { name: "onClearChat", type: "() => void", required: false, description: "Called when user clears the chat from header menu" },
      { name: "onRetry", type: "() => void", required: false, description: "Called when user clicks Retry on the error block" },
      { name: "onDismiss", type: "() => void", required: false, description: "Called when user clicks Dismiss on the error block" },
      { name: "suggestedPrompts", type: "string[]", required: false, description: "Quick-reply prompt labels (e.g. Summarize, Explain)" },
      { name: "onSelectPrompt", type: "(p: string) => void", required: false, description: "Called when user selects a suggested prompt" },
      { name: "attachments", type: "{ id: string; name: string }[]", required: false, description: "Attachment chips to show above the input" },
      { name: "onRemoveAttachment", type: "(id: string) => void", required: false, description: "Called when user removes an attachment" },
      { name: "onSend", type: "(message: string) => void", required: false, description: "Called when user sends a message" },
    ],
    dependencies: ["@/components/ui/button", "@/components/ui/textarea", "@/components/ui/avatar", "@/components/ui/badge", "@/components/ui/scroll-area", "@/components/ui/alert", "@/components/ui/select", "@/components/ui/dropdown-menu", "framer-motion", "lucide-react", "@/lib/utils"],
    whenToUse: "Full-page chat: header with model selector and Clear chat, messages (user left / assistant right), code block, error, typing, suggested prompts, prompt bar with attachments. Uses --chat-* theme vars and micro-animations.",
    alternatives: ["chat-layout", "ai-assistant-panel"],
    patternCategory: "Layout",
  },
  "agent-avatar-status": {
    props: [
      { name: "status", type: "string", required: false, description: "Badge label (e.g. live, thinking)" },
      { name: "label", type: "string", required: false, description: "Agent name" },
    ],
    dependencies: ["@/components/ui/avatar", "@/components/ui/badge"],
    whenToUse: "Use for AI agent identity with status indicator in headers or sidebars.",
    alternatives: [],
    patternCategory: "Chat",
  },
  "ai-response-card": {
    props: [{ name: "content", type: "string", required: true }],
    dependencies: ["@/components/ui/card", "@/components/ui/button", "lucide-react"],
    whenToUse: "Card layout for a single AI response with optional Copy/Regenerate actions.",
    alternatives: [],
    patternCategory: "Chat",
  },
  "prompt-attachments": {
    props: [
      { name: "attachments", type: "{ id: string; name: string }[]", required: true },
      { name: "onRemove", type: "(id: string) => void", required: false },
      { name: "onAdd", type: "() => void", required: false },
    ],
    dependencies: ["@/components/ui/button", "@/components/ui/textarea", "lucide-react"],
    whenToUse: "Prompt input with file/attachment chips. Use when users can attach files to the message.",
    alternatives: ["prompt-input-bar"],
    patternCategory: "Prompt input",
  },
};
