import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Bot, Sparkles, CircleAlert, Copy, X } from "lucide-react";
import { ChatMessageRow, ChatLayout, AIChatPlayground } from "@/features/chat";
import { TextToSpeechTemplate, VoicePromptWithBubble } from "@/features/tts";
import { SpeechToTextTemplate } from "@/features/stt";

export type TemplateType = "block" | "page";

export interface TemplateEntry {
  slug: string;
  name: string;
  description: string;
  type: TemplateType;
  component: React.ReactNode;
  code: string;
  examples?: { title: string; component: React.ReactNode; code: string }[];
}

export const templatesRegistry: Record<string, TemplateEntry> = {
  "chat-message-row": {
    slug: "chat-message-row",
    name: "Chat message row",
    description: "A single message row for user (right) or assistant (left) with avatar, themed bubble, and micro-animation.",
    type: "block",
    component: (
      <div className="space-y-4" style={{ gap: "var(--chat-message-gap)" }}>
        <ChatMessageRow role="user" content="What's the best way to structure this API?" />
        <ChatMessageRow role="assistant" content="Here's a summary of the changes. Should I apply them?" />
      </div>
    ),
    code: `"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const messageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}
const transition = { duration: 0.22, ease: "easeOut" }

export function ChatMessageRow({ role, content, className }: { role: "user" | "assistant"; content: string; className?: string }) {
  const isUser = role === "user"
  return (
    <motion.div
      layout
      initial={messageVariants.initial}
      animate={messageVariants.animate}
      exit={messageVariants.exit}
      transition={transition}
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-start" : "justify-end flex-row-reverse",
        className
      )}
    >
      <Avatar className={cn("h-8 w-8 shrink-0 border", isUser ? "border-border" : "border-primary/30")}>
        <AvatarFallback className={cn("text-xs", isUser ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary")}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-[var(--chat-bubble-radius)] px-3 py-2 text-sm backdrop-filter blur-[var(--glass-blur)] border",
          isUser
            ? "bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] border-primary/20"
            : "bg-[var(--chat-assistant-bg)] text-[var(--chat-assistant-text)] border-[var(--glass-border)]"
        )}
      >
        <p className="text-foreground">{content}</p>
      </div>
    </motion.div>
  )
}
`,
  },
  "prompt-input-bar": {
    slug: "prompt-input-bar",
    name: "Prompt input bar",
    description: "Input area with send button for AI prompts.",
    type: "block",
    component: (
      <div className="flex gap-2 w-full max-w-lg rounded-xl glass p-2 shadow-sm">
        <Textarea
          placeholder="Ask anything..."
          className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
        />
        <Button size="icon" className="shrink-0 h-10 w-10 rounded-lg">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function PromptInputBar() {
  return (
    <div className="flex gap-2 w-full max-w-lg rounded-xl glass p-2 shadow-sm">
      <Textarea
        placeholder="Ask anything..."
        className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0"
        rows={1}
      />
      <Button size="icon" className="shrink-0 h-10 w-10 rounded-lg">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  )
}
`,
  },
  "voice-prompt-with-bubble": {
    slug: "voice-prompt-with-bubble",
    name: "Voice prompt with bubble",
    description:
      "Clean, minimal voice prompt: iridescent bubble that shrinks on input focus with revealed helper text. No branding.",
    type: "page",
    component: (
      <div className="flex h-[520px] w-full max-w-2xl mx-auto flex-col rounded-xl overflow-hidden shadow-lg border border-border bg-gradient-to-b from-background to-muted/20">
        <div className="flex flex-1 flex-col items-center justify-center min-h-0 p-6 sm:p-8">
          <VoicePromptWithBubble className="w-full flex-1 justify-center" />
        </div>
      </div>
    ),
    code: `"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function VoicePromptWithBubble({
  className,
  placeholder = "Or type a message...",
  revealedText = "Add it to the template — similar to Text to Speech.",
  onFocusChange,
}: {
  className?: string
  placeholder?: string
  revealedText?: string
  onFocusChange?: (focused: boolean) => void
}) {
  const [inputFocused, setInputFocused] = useState(false)
  const [value, setValue] = useState("")

  const handleFocus = () => { setInputFocused(true); onFocusChange?.(true) }
  const handleBlur = () => { setInputFocused(false); onFocusChange?.(false) }

  return (
    <div className={cn("flex flex-col items-center gap-6 min-h-[200px]", className)}>
      <motion.div
        className="relative flex-shrink-0 rounded-full"
        animate={{ width: inputFocused ? 56 : 240, height: inputFocused ? 56 : 240 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 rounded-full w-full h-full border border-white/20"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(120,200,255,0.35), transparent 50%), radial-gradient(ellipse 60% 60% at 50% 50%, rgba(100,220,200,0.4), transparent 45%)",
            boxShadow: "0 0 60px rgba(100,180,220,0.2), inset 0 0 40px rgba(255,255,255,0.08)",
          }}
        />
      </motion.div>
      <AnimatePresence>
        {inputFocused && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-sm text-muted-foreground text-center max-w-md"
          >
            {revealedText}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="w-full flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-3 py-2 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20">
        <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground" aria-label="Voice input">
          <Phone className="h-4 w-4" />
        </button>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0"
        />
      </div>
    </div>
  )
}
`,
  },
  "ai-response-card": {
    slug: "ai-response-card",
    name: "AI response card",
    description: "Card layout for displaying an AI-generated response with optional actions.",
    type: "block",
    component: (
      <Card className="max-w-md overflow-hidden">
        <CardHeader className="pb-2 flex flex-row items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Based on your request, here are three options you can choose from. Each has different trade-offs.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Copy</Button>
            <Button size="sm" variant="ghost">Regenerate</Button>
          </div>
        </CardContent>
      </Card>
    ),
    code: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function AIResponseCard({ content }: { content: string }) {
  return (
    <Card className="max-w-md">
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <CardTitle className="text-base">Response</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{content}</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Copy</Button>
          <Button size="sm" variant="ghost">Regenerate</Button>
        </div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "agent-avatar-status": {
    slug: "agent-avatar-status",
    name: "Agent avatar with status",
    description: "Avatar for an AI agent with status badge (online, thinking, etc.).",
    type: "block",
    component: (
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-primary/30 shadow-[0_0_12px_var(--glow-primary)]">
            <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
          </Avatar>
          <Badge className="absolute -bottom-1 -right-1 h-5 px-1.5 text-xs bg-green-500/90 border-0">Live</Badge>
        </div>
        <div>
          <p className="font-medium text-sm">Assistant</p>
          <p className="text-xs text-muted-foreground">Ready to help</p>
        </div>
      </div>
    ),
    code: `import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AgentAvatarStatus({ status = "live", label = "Assistant" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-primary/30">
          <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
        </Avatar>
        <Badge className="absolute -bottom-1 -right-1 h-5 px-1.5 text-xs bg-green-500/90 border-0">
          {status}
        </Badge>
      </div>
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">Ready to help</p>
      </div>
    </div>
  )
}
`,
  },
  "chat-layout": {
    slug: "chat-layout",
    name: "Chat layout",
    description: "Full layout with sidebar (conversation list with delete), message thread (user right / assistant left), and prompt input. Uses theme variables and micro-animations.",
    type: "page",
    component: <ChatLayout />,
    code: `"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, MoreHorizontal, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

function ChatMessageRow({ role, content, className }: { role: "user" | "assistant"; content: string; className?: string }) {
  const isUser = role === "user"
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-start" : "justify-end flex-row-reverse",
        className
      )}
    >
      <Avatar className={cn("h-8 w-8 shrink-0 border", isUser ? "border-border" : "border-primary/30")}>
        <AvatarFallback className={cn("text-xs", isUser ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary")}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[var(--chat-bubble-max-width,85%)] rounded-[var(--chat-bubble-radius)] px-3 py-2 text-sm border",
          isUser ? "bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] border-primary/20" : "bg-[var(--chat-assistant-bg)] text-[var(--chat-assistant-text)] border-[var(--glass-border)]"
        )}
      >
        <p className="text-foreground">{content}</p>
      </div>
    </motion.div>
  )
}

function ChatConversationItem({ id, title, isActive, onDelete }: { id: string; title: string; isActive?: boolean; onDelete?: (id: string) => void }) {
  return (
    <motion.div layout initial={{ opacity: 1 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <div className={cn("group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm", isActive ? "bg-accent/50 text-foreground" : "text-muted-foreground hover:bg-accent/30 hover:text-foreground")}>
        <span className="flex-1 truncate">{title}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100" aria-label="Options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onSelect={(e) => { e.preventDefault(); onDelete?.(id) }}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}

export function ChatLayout({ onDeleteConversation }: { onDeleteConversation?: (id: string) => void }) {
  const [conversations, setConversations] = useState([{ id: "1", title: "Summary doc" }, { id: "2", title: "Code review" }, { id: "3", title: "API design" }])
  const [messages] = useState([
    { id: "m1", role: "user" as const, content: "What's the best way to structure this API?" },
    { id: "m2", role: "assistant" as const, content: "Consider REST with versioned routes and clear status codes. I can draft a spec." },
  ])
  const [activeId, setActiveId] = useState("1")
  const handleDelete = (id: string) => {
    setConversations((p) => p.filter((c) => c.id !== id))
    if (activeId === id && conversations.length > 1) setActiveId(conversations.find((c) => c.id !== id)?.id ?? "")
    onDeleteConversation?.(id)
  }
  return (
    <div className="flex h-[420px] w-full max-w-4xl rounded-xl glass overflow-hidden">
      <aside className="w-56 glass border-0 border-r border-border p-3 flex flex-col gap-2">
        <Button variant="ghost" size="sm" className="justify-start"><Bot className="mr-2 h-4 w-4" /> New chat</Button>
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            <AnimatePresence mode="sync" initial={false}>
              {conversations.map((conv) => (
                <ChatConversationItem key={conv.id} id={conv.id} title={conv.title} isActive={activeId === conv.id} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col min-w-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4" style={{ gap: "var(--chat-message-gap)" }}>
            <AnimatePresence mode="sync" initial={false}>
              {messages.map((msg) => <ChatMessageRow key={msg.id} role={msg.role} content={msg.content} />)}
            </AnimatePresence>
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-border">
          <div className="flex gap-2 rounded-lg glass p-2">
            <Input placeholder="Type a message..." className="border-0 bg-transparent focus-visible:ring-0" />
            <Button size="icon" className="shrink-0 h-9 w-9"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </main>
    </div>
  )
}
`,
  },
  "ai-assistant-panel": {
    slug: "ai-assistant-panel",
    name: "AI assistant panel",
    description: "Floating panel layout for an AI assistant with header and content area.",
    type: "page",
    component: (
      <div className="flex h-[380px] w-full max-w-[420px] rounded-xl glass overflow-hidden shadow-lg">
        <div className="flex flex-col w-full p-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-semibold">Assistant</p>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>This is a floating panel you can use for an AI assistant. Add your chat thread and prompt input here.</p>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2 rounded-lg glass p-2">
              <Input placeholder="Ask something..." className="border-0 bg-transparent focus-visible:ring-0 text-sm" />
              <Button size="icon" className="shrink-0 h-8 w-8"><Send className="h-3 w-3" /></Button>
            </div>
          </div>
        </div>
      </div>
    ),
    code: `import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

export function AIAssistantPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[380px] sm:w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-base">Assistant</SheetTitle>
              <p className="text-xs text-muted-foreground">Ask me anything</p>
            </div>
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4">
          {/* Chat messages */}
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <div className="flex gap-2 rounded-lg glass p-2">
            <Input placeholder="Ask something..." className="border-0 bg-transparent focus-visible:ring-0 text-sm" />
            <Button size="icon" className="shrink-0 h-8 w-8"><Send className="h-3 w-3" /></Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
`,
  },
  "typing-indicator": {
    slug: "typing-indicator",
    name: "Typing indicator",
    description: "Animated dots or skeleton line for “AI is thinking” state.",
    type: "block",
    component: (
      <div className="flex gap-3 max-w-md">
        <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
          <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
        </Avatar>
        <div className="rounded-lg glass px-3 py-2.5 flex gap-1">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
          </span>
        </div>
      </div>
    ),
    code: `import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-md">
      <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
        <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
      </Avatar>
      <div className="rounded-lg glass px-3 py-2.5 flex gap-1">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  )
}
`,
  },
  "suggested-prompts": {
    slug: "suggested-prompts",
    name: "Suggested prompts",
    description: "Row of quick-reply chips for empty or follow-up state.",
    type: "block",
    component: (
      <div className="flex flex-wrap gap-2 max-w-lg">
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Summarize
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Explain
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Improve
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Shorten
        </Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"

export function SuggestedPrompts({ prompts, onSelect }: { prompts: string[]; onSelect?: (p: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 max-w-lg">
      {prompts.map((p) => (
        <Button key={p} variant="outline" size="sm" className="rounded-full text-xs" onClick={() => onSelect?.(p)}>
          {p}
        </Button>
      ))}
    </div>
  )
}
`,
  },
  "chat-code-block": {
    slug: "chat-code-block",
    name: "Chat code block",
    description: "Inline code block with copy button and optional language label for AI code responses.",
    type: "block",
    component: (
      <div className="max-w-md rounded-lg glass overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/80">
          <Badge variant="secondary" className="text-xs font-mono">ts</Badge>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            <Copy className="h-3 w-3" />
            Copy
          </Button>
        </div>
        <pre className="p-3 text-sm font-mono overflow-x-auto">
          <code className="text-foreground">{`const greet = (name: string) => \`Hello, \${name}\`;`}</code>
        </pre>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy } from "lucide-react"

export function ChatCodeBlock({ code, language = "ts" }: { code: string; language?: string }) {
  return (
    <div className="max-w-md rounded-lg glass overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/80">
        <Badge variant="secondary" className="text-xs font-mono">{language}</Badge>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={() => navigator.clipboard.writeText(code)}>
          <Copy className="h-3 w-3" /> Copy
        </Button>
      </div>
      <pre className="p-3 text-sm font-mono overflow-x-auto">
        <code className="text-foreground">{code}</code>
      </pre>
    </div>
  )
}
`,
  },
  "tool-call-display": {
    slug: "tool-call-display",
    name: "Tool call display",
    description: "Collapsible card showing “Calling tool…” and result (e.g. get_weather → result).",
    type: "block",
    component: (
      <Collapsible defaultOpen className="max-w-md">
        <Card className="overflow-hidden">
          <CollapsibleTrigger asChild>
            <button type="button" className="w-full text-left">
              <CardHeader className="pb-2 flex flex-row items-center gap-2 py-3">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />
                <CardTitle className="text-base">Tool: get_weather</CardTitle>
                <span className="ml-auto text-xs text-muted-foreground">▼</span>
              </CardHeader>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              <p className="text-xs text-muted-foreground">Arguments: {`{ "location": "London" }`}</p>
              <pre className="rounded bg-muted/80 p-2 text-xs font-mono overflow-x-auto">
                {`{ "temp": 14, "unit": "c" }`}
              </pre>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    ),
    code: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Sparkles } from "lucide-react"

export function ToolCallDisplay({ name, args, result }: { name: string; args?: string; result?: string }) {
  return (
    <Collapsible defaultOpen className="max-w-md">
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <button type="button" className="w-full text-left">
            <CardHeader className="pb-2 flex flex-row items-center gap-2 py-3">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <CardTitle className="text-base">Tool: {name}</CardTitle>
              <span className="ml-auto text-xs text-muted-foreground">▼</span>
            </CardHeader>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-2">
            {args && <p className="text-xs text-muted-foreground">Arguments: {args}</p>}
            {result && <pre className="rounded bg-muted/80 p-2 text-xs font-mono overflow-x-auto">{result}</pre>}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
`,
  },
  "message-error-retry": {
    slug: "message-error-retry",
    name: "Message error with retry",
    description: "Error state for a message (icon + message) with “Retry” and optional “Dismiss”.",
    type: "block",
    component: (
      <div className="flex gap-3 max-w-md">
        <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
          <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
        </Avatar>
        <Alert variant="destructive" className="flex-1 py-2">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle className="text-sm">Something went wrong</AlertTitle>
          <AlertDescription className="text-xs">The request failed. Please try again.</AlertDescription>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
              Retry
            </Button>
            <Button size="sm" variant="ghost">Dismiss</Button>
          </div>
        </Alert>
      </div>
    ),
    code: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CircleAlert } from "lucide-react"

export function MessageErrorRetry({ message, onRetry, onDismiss }: { message: string; onRetry?: () => void; onDismiss?: () => void }) {
  return (
    <div className="flex gap-3 max-w-md">
      <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
        <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
      </Avatar>
      <Alert variant="destructive" className="flex-1 py-2">
        <CircleAlert className="h-4 w-4" />
        <AlertTitle className="text-sm">Something went wrong</AlertTitle>
        <AlertDescription className="text-xs">{message}</AlertDescription>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={onRetry}>Retry</Button>
          <Button size="sm" variant="ghost" onClick={onDismiss}>Dismiss</Button>
        </div>
      </Alert>
    </div>
  )
}
`,
  },
  "response-loading-skeleton": {
    slug: "response-loading-skeleton",
    name: "Response loading skeleton",
    description: "Skeleton lines or placeholder for AI response before/while streaming.",
    type: "block",
    component: (
      <div className="flex gap-3 max-w-md">
        <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
          <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
        </Avatar>
        <div className="rounded-lg glass px-3 py-2.5 space-y-2 flex-1">
          <Skeleton className="h-3 w-full max-w-[90%]" />
          <Skeleton className="h-3 w-full max-w-[70%]" />
          <Skeleton className="h-3 w-full max-w-[50%]" />
        </div>
      </div>
    ),
    code: `import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export function ResponseLoadingSkeleton() {
  return (
    <div className="flex gap-3 max-w-md">
      <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
        <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
      </Avatar>
      <div className="rounded-lg glass px-3 py-2.5 space-y-2 flex-1">
        <Skeleton className="h-3 w-full max-w-[90%]" />
        <Skeleton className="h-3 w-full max-w-[70%]" />
        <Skeleton className="h-3 w-full max-w-[50%]" />
      </div>
    </div>
  )
}
`,
  },
  "prompt-attachments": {
    slug: "prompt-attachments",
    name: "Prompt with attachments",
    description: "Prompt input bar with file/attachment chips (e.g. file.pdf with remove).",
    type: "block",
    component: (
      <div className="w-full max-w-lg rounded-xl glass p-2 shadow-sm space-y-2">
        <div className="flex flex-wrap gap-1.5 px-1">
          <span className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 text-xs">
            document.pdf
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5 shrink-0">
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 text-xs">
            image.png
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5 shrink-0">
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </span>
        </div>
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask anything..."
            className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            rows={1}
          />
          <Button size="icon" className="shrink-0 h-10 w-10 rounded-lg">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, X } from "lucide-react"

export function PromptAttachments({ attachments, onRemove, onAdd }: { attachments: { id: string; name: string }[]; onRemove?: (id: string) => void; onAdd?: () => void }) {
  return (
    <div className="w-full max-w-lg rounded-xl glass p-2 shadow-sm space-y-2">
      <div className="flex flex-wrap gap-1.5 px-1">
        {attachments.map((a) => (
          <span key={a.id} className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 text-xs">
            {a.name}
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => onRemove?.(a.id)}>
              <X className="h-3 w-3" /><span className="sr-only">Remove</span>
            </Button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Textarea placeholder="Ask anything..." className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0" rows={1} />
        <Button size="icon" className="shrink-0 h-10 w-10 rounded-lg"><Send className="h-4 w-4" /><span className="sr-only">Send</span></Button>
      </div>
    </div>
  )
}
`,
  },
  "ai-chat-playground": {
    slug: "ai-chat-playground",
    name: "AI chat playground",
    description:
      "Full-page layout: header with model selector and Clear chat, message list (user left / assistant right), code block, error, typing, suggested prompts, prompt bar with attachments. Uses --chat-* theme vars and micro-animations.",
    type: "page",
    component: <AIChatPlayground />,
    code: `"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Send, CircleAlert, Copy, X, MoreVertical, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const msgTransition = { duration: 0.22, ease: "easeOut" }
const msgVariants = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } }

function ChatMessageRow({ role, content, className }: { role: "user" | "assistant"; content: string; className?: string }) {
  const isUser = role === "user"
  return (
    <motion.div layout initial={msgVariants.initial} animate={msgVariants.animate} exit={msgVariants.exit} transition={msgTransition} className={cn("flex gap-3 w-full", isUser ? "justify-start" : "justify-end flex-row-reverse", className)}>
      <Avatar className={cn("h-8 w-8 shrink-0 border", isUser ? "border-border" : "border-primary/30")}>
        <AvatarFallback className={cn("text-xs", isUser ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary")}>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>
      <div className={cn("max-w-[var(--chat-bubble-max-width,85%)] rounded-[var(--chat-bubble-radius)] px-3 py-2 text-sm border", isUser ? "bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] border-primary/20" : "bg-[var(--chat-assistant-bg)] text-[var(--chat-assistant-text)] border-[var(--glass-border)]")}>
        <p className="text-foreground">{content}</p>
      </div>
    </motion.div>
  )
}

export function AIChatPlayground({
  onClearChat,
  onRetry,
  onDismiss,
  suggestedPrompts = ["Summarize", "Explain", "Improve"],
  onSelectPrompt,
  attachments = [{ id: "a1", name: "file.pdf" }],
  onRemoveAttachment,
  onSend,
  className,
}: {
  onClearChat?: () => void
  onRetry?: () => void
  onDismiss?: () => void
  suggestedPrompts?: string[]
  onSelectPrompt?: (p: string) => void
  attachments?: { id: string; name: string }[]
  onRemoveAttachment?: (id: string) => void
  onSend?: (message: string) => void
  className?: string
}) {
  const [messages, setMessages] = useState([{ id: "1", role: "user" as const, content: "Explain this code to me." }, { id: "2", role: "assistant" as const, content: "Here's a simple helper:" }])
  const [showAssistantBlocks, setShowAssistantBlocks] = useState(true)
  const [model, setModel] = useState("gpt-4")
  const [inputValue, setInputValue] = useState("")
  const sampleCode = "const greet = (name: string) => \`Hello, \${name}\`;"
  const handleClear = () => { setMessages([]); setShowAssistantBlocks(false); onClearChat?.() }
  const handleCopy = () => { void navigator.clipboard.writeText(sampleCode) }
  const blockClass = "rounded-[var(--chat-bubble-radius)] border border-[var(--glass-border)] bg-[var(--chat-assistant-bg)] backdrop-blur-[var(--glass-blur)] max-w-[var(--chat-bubble-max-width,85%)]"
  return (
    <div className={cn("flex h-[520px] w-full max-w-4xl flex-col rounded-xl glass overflow-hidden", className)}>
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-sm">AI Chat</h2>
        <div className="flex items-center gap-2">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[180px] h-9" aria-label="Model"><SelectValue placeholder="Model" /></SelectTrigger>
            <SelectContent><SelectItem value="gpt-4">GPT-4</SelectItem><SelectItem value="claude">Claude</SelectItem></SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" aria-label="Chat options"><MoreVertical className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onSelect={(e) => { e.preventDefault(); handleClear() }}><Trash2 className="mr-2 h-4 w-4" /> Clear chat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col" style={{ gap: "var(--chat-message-gap)" }}>
          <AnimatePresence mode="sync" initial={false}>
            {messages.map((msg) => <ChatMessageRow key={msg.id} role={msg.role} content={msg.content} />)}
            {showAssistantBlocks && (
              <>
                <motion.div key="code" layout initial={msgVariants.initial} animate={msgVariants.animate} exit={msgVariants.exit} transition={msgTransition} className="flex gap-3 w-full justify-end flex-row-reverse">
                  <Avatar className="h-8 w-8 shrink-0 border border-primary/30"><AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback></Avatar>
                  <div className={cn(blockClass, "overflow-hidden flex-1 min-w-0")}>
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/80"><Badge variant="secondary" className="text-xs font-mono">ts</Badge><Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={handleCopy}><Copy className="h-3 w-3" /> Copy</Button></div>
                    <pre className="p-3 text-sm font-mono overflow-x-auto"><code className="text-foreground">{sampleCode}</code></pre>
                  </div>
                </motion.div>
                <motion.div key="error" layout initial={msgVariants.initial} animate={msgVariants.animate} exit={msgVariants.exit} transition={msgTransition} className="flex gap-3 w-full justify-end flex-row-reverse">
                  <Avatar className="h-8 w-8 shrink-0 border border-primary/30"><AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0 max-w-[var(--chat-bubble-max-width,85%)]">
                    <Alert variant="destructive" className="py-2">
                      <CircleAlert className="h-4 w-4" /><AlertTitle className="text-sm">Error</AlertTitle><AlertDescription className="text-xs">Request failed. Retry?</AlertDescription>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={onRetry}>Retry</Button>
                        <Button size="sm" variant="ghost" onClick={onDismiss}>Dismiss</Button>
                      </div>
                    </Alert>
                  </div>
                </motion.div>
                <motion.div key="typing" layout initial={msgVariants.initial} animate={msgVariants.animate} exit={msgVariants.exit} transition={msgTransition} className="flex gap-3 w-full justify-end flex-row-reverse">
                  <Avatar className="h-8 w-8 shrink-0 border border-primary/30"><AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback></Avatar>
                  <div className={cn(blockClass, "px-3 py-2.5 flex gap-1")}><span className="flex gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" /><span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" /><span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" /></span></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          {messages.length === 0 && !showAssistantBlocks && <p className="text-sm text-muted-foreground py-4 text-center">Send a message or pick a prompt below.</p>}
        </div>
      </ScrollArea>
      <div className="space-y-2 p-3 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p) => <Button key={p} variant="outline" size="sm" className="rounded-full text-xs" onClick={() => onSelectPrompt?.(p)}>{p}</Button>)}
        </div>
        <div className="w-full rounded-xl glass p-2 shadow-sm space-y-2">
          <div className="flex flex-wrap gap-1.5 px-1">
            {attachments.map((a) => (
              <span key={a.id} className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 text-xs">
                {a.name}
                <Button type="button" variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => onRemoveAttachment?.(a.id)} aria-label={"Remove " + a.name}><X className="h-3 w-3" /><span className="sr-only">Remove</span></Button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea placeholder="Ask anything..." className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0" rows={1} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (inputValue.trim()) { onSend?.(inputValue.trim()); setInputValue("") } } }} />
            <Button size="icon" className="shrink-0 h-10 w-10 rounded-lg" onClick={() => { if (inputValue.trim()) { onSend?.(inputValue.trim()); setInputValue("") } }} aria-label="Send message"><Send className="h-4 w-4" /><span className="sr-only">Send</span></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
`,
  },
  "text-to-speech": {
    slug: "text-to-speech",
    name: "Text to Speech",
    description:
      "Full-page TTS template: header, text input with suggestion pills, Settings/History sidebar (voice, model, sliders), and bottom audio player bar. Debranded, with subtle animations. Copy-paste ready.",
    type: "page",
    component: <TextToSpeechTemplate />,
    code: `"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Volume2, ChevronUp, Bell, BookOpen, Smile, Mic, Languages, Film, Gamepad2, Radio, Flower2, X, SkipBack, Play, Pause, SkipForward, Download, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

const rootTransition = { duration: 0.35, ease: "easeOut" }
const rootVariants = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
const suggestionContainerVariants = { animate: { transition: { staggerChildren: 0.04 } } }
const suggestionItemVariants = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } }
const sectionTransition = { duration: 0.28, ease: "easeOut" }
const headerVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 0.06, ...sectionTransition } } }
const mainLeftVariants = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0, transition: { delay: 0.1, ...sectionTransition } } }
const sidebarVariants = { initial: { opacity: 0, x: 6 }, animate: { opacity: 1, x: 0, transition: { delay: 0.14, ...sectionTransition } } }
const footerVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 0.2, ...sectionTransition } } }

const defaultSuggestions = [
  { label: "Narrate a story", icon: BookOpen, preview: "Once upon a time, in a land far away, there lived a brave knight who set out on a great adventure..." },
  { label: "Tell a silly joke", icon: Smile, preview: "Why did the scarecrow win an award? He was outstanding in his field." },
  { label: "Record an advertisement", icon: Mic, preview: "Introducing the all-new product that will change your life. Limited time offer—get yours today!" },
  { label: "Speak in different languages", icon: Languages, preview: "Hello, welcome! Bonjour, bienvenue! Hola, bienvenido! Discover the world in every language." },
  { label: "Direct a dramatic movie scene", icon: Film, preview: "The hero stands at the edge of the cliff. The wind howls. He turns slowly. 'This ends now.'" },
  { label: "Hear from a video game character", icon: Gamepad2, preview: "Player, the fate of the realm rests on your shoulders. Will you accept this quest?" },
  { label: "Introduce your podcast", icon: Radio, preview: "Welcome to the show! Today we're diving into a topic that will surprise you. Let's get started." },
  { label: "Guide a meditation class", icon: Flower2, preview: "Find a comfortable seat. Close your eyes. Take a deep breath in... and slowly release. Let your body relax." },
]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return \`\${m}:\${s.toString().padStart(2, "0")}\`
}

export function TextToSpeechTemplate({ onSuggestionSelect, className }: { onSuggestionSelect?: (label: string) => void; className?: string }) {
  const [text, setText] = useState("")
  const [hoveredSuggestion, setHoveredSuggestion] = useState(null)
  const [voice, setVoice] = useState("rachel")
  const [model, setModel] = useState("multilingual_v2")
  const [speed, setSpeed] = useState([50])
  const [stability, setStability] = useState([50])
  const [similarity, setSimilarity] = useState([75])
  const [styleExaggeration, setStyleExaggeration] = useState([50])
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(3)
  const [duration] = useState(9)
  const [promoDismissed, setPromoDismissed] = useState(false)
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleSuggestionClick = (label: string) => {
    setText((prev) => (prev ? prev + "\\n\\n" : "") + "Try: " + label.toLowerCase() + ".")
    onSuggestionSelect?.(label)
  }
  const handleRewind = () => setCurrentTime((t) => Math.max(0, t - 10))
  const handleForward = () => setCurrentTime((t) => Math.min(duration, t + 10))
  const handlePlayPause = () => setPlaying((p) => !p)
  const previewFor = (label) => defaultSuggestions.find((s) => s.label === label)?.preview ?? ""
  const displayValue = hoveredSuggestion ? previewFor(hoveredSuggestion) : text

  return (
    <motion.div initial={rootVariants.initial} animate={rootVariants.animate} transition={rootTransition} className={cn("flex h-[600px] w-full max-w-5xl flex-col rounded-xl overflow-hidden shadow-lg border border-border bg-gradient-to-b from-background to-muted/20", className)}>
      <motion.header initial="initial" animate="animate" variants={headerVariants} className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20">
            <Volume2 className="h-4 w-4 text-primary" />
          </div>
          <h1 className="font-semibold text-base">Text to Speech</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">Feedback</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">Docs</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">Ask<ChevronUp className="ml-1 h-3 w-3" /></Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" aria-label="Notifications"><Bell className="h-4 w-4" /></Button>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="text-xs bg-muted text-muted-foreground">U</AvatarFallback>
          </Avatar>
        </div>
      </motion.header>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <motion.div initial="initial" animate="animate" variants={mainLeftVariants} className="flex flex-1 flex-col min-w-0 min-h-0 p-4 gap-3 overflow-hidden">
          <div className="flex-1 min-h-0 flex flex-col">
            <Textarea placeholder="Start typing here or paste any text you want to turn into lifelike speech..." className="h-full min-h-[100px] resize-none rounded-lg border border-border bg-muted/20 bg-gradient-to-b from-muted/10 to-muted/20 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2" value={displayValue} onChange={(e) => { setHoveredSuggestion(null); setText(e.target.value) }} onFocus={() => setHoveredSuggestion(null)} />
          </div>
          <div className="shrink-0 space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Get started with</p>
            <motion.div className="flex flex-wrap gap-2" variants={suggestionContainerVariants} initial="initial" animate="animate">
              {defaultSuggestions.map(({ label, icon: Icon }) => (
                <motion.div key={label} variants={suggestionItemVariants}>
                  <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-muted-foreground hover:text-foreground transition-colors" onClick={() => handleSuggestionClick(label)} onMouseEnter={() => setHoveredSuggestion(label)} onMouseLeave={() => setHoveredSuggestion(null)}>
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.aside initial="initial" animate="animate" variants={sidebarVariants} className="w-[280px] shrink-0 border-l border-border flex flex-col min-h-0 bg-gradient-to-b from-muted/10 to-muted/30">
          <Tabs defaultValue="settings" className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="shrink-0 px-3 pt-3 border-b border-border">
              <TabsList className="w-full grid grid-cols-2 h-9">
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
                <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
              </TabsList>
            </div>
            <ScrollArea className="flex-1 min-h-0">
              <TabsContent value="settings" className="m-0 p-3 space-y-4">
                <AnimatePresence>
                  {!promoDismissed && (
                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                        <CardContent className="p-3 flex items-start gap-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center">
                            <Volume2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">Pro tip</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Adjust sliders to fine-tune expression and clarity.</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => setPromoDismissed(true)} aria-label="Dismiss">
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Voice</p>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger className="h-10 w-full rounded-lg">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 rounded-full bg-pink-500/20">
                          <AvatarFallback className="text-[10px] text-pink-600">R</AvatarFallback>
                        </Avatar>
                        <SelectValue placeholder="Voice" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rachel">Rachel</SelectItem>
                      <SelectItem value="adam">Adam</SelectItem>
                      <SelectItem value="bella">Bella</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Model</p>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="h-10 w-full rounded-lg">
                      <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multilingual_v2">Multilingual v2</SelectItem>
                      <SelectItem value="turbo_v2">Turbo v2</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-emerald-500/10 border border-border p-2 mt-2">
                    <p className="text-xs text-muted-foreground">Improved expression and clarity</p>
                    <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-xs">Try latest model</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Speed</span>
                      <span className="text-foreground">Slower — Faster</span>
                    </div>
                    <Slider value={speed} onValueChange={setSpeed} max={100} step={1} className="w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Stability</span>
                      <span className="text-foreground">More variable — More stable</span>
                    </div>
                    <Slider value={stability} onValueChange={setStability} max={100} step={1} className="w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Similarity</span>
                      <span className="text-foreground">Low — High</span>
                    </div>
                    <Slider value={similarity} onValueChange={setSimilarity} max={100} step={1} className="w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Style Exaggeration</p>
                    <Slider value={styleExaggeration} onValueChange={setStyleExaggeration} max={100} step={1} className="w-full" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="m-0 p-3">
                <p className="text-sm text-muted-foreground text-center py-8">No history yet. Generate speech to see past items.</p>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </motion.aside>
      </div>
      <motion.footer initial="initial" animate="animate" variants={footerVariants} className="flex items-center gap-4 border-t border-border px-4 py-3 shrink-0 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20">
        <div className="min-w-0 shrink">
          <p className="text-sm font-medium truncate">Default voice</p>
          <p className="text-xs text-muted-foreground">Preview</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 min-w-0">
          <div className="flex items-center gap-2 w-full max-w-md">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleRewind} aria-label="Rewind 10s"><SkipBack className="h-4 w-4" /></Button>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full bg-primary/20 hover:bg-primary/30" onClick={handlePlayPause} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="h-5 w-5 text-primary" /> : <Play className="h-5 w-5 text-primary ml-0.5" />}
              </Button>
            </motion.div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleForward} aria-label="Forward 10s"><SkipForward className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground tabular-nums w-8">{formatTime(currentTime)}</span>
            <Progress value={progressPercent} className="flex-1 h-1.5" />
            <span className="text-xs text-muted-foreground tabular-nums w-8">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Download"><Download className="h-4 w-4" /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="More options"><MoreVertical className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.footer>
    </motion.div>
  )
}
`,
  },
  "speech-to-text": {
    slug: "speech-to-text",
    name: "Speech to Text",
    description:
      "Full-page STT template: header, transcript area with suggestion pills, Settings/History sidebar (language, model), and bottom recording bar with copy/download. Same layout and animations as the Text to Speech template.",
    type: "page",
    component: <SpeechToTextTemplate />,
    code: `"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mic, Bell, X, Square, Copy, Download, MoreVertical, Video, FileText, MessageSquare, Headphones, MicOff, GraduationCap, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const rootTransition = { duration: 0.35, ease: "easeOut" }
const rootVariants = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
const suggestionContainerVariants = { animate: { transition: { staggerChildren: 0.04 } } }
const suggestionItemVariants = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } }
const sectionTransition = { duration: 0.28, ease: "easeOut" }
const headerVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 0.06, ...sectionTransition } } }
const mainLeftVariants = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0, transition: { delay: 0.1, ...sectionTransition } } }
const sidebarVariants = { initial: { opacity: 0, x: 6 }, animate: { opacity: 1, x: 0, transition: { delay: 0.14, ...sectionTransition } } }
const footerVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 0.2, ...sectionTransition } } }

const defaultSuggestions = [
  { label: "Transcribe meeting", icon: MessageSquare, preview: "Welcome everyone to the Q3 planning call..." },
  { label: "Dictate notes", icon: FileText, preview: "Action items: schedule follow-up with design by Friday..." },
  { label: "Caption video", icon: Video, preview: "[00:01] In this tutorial we'll walk through the setup." },
  { label: "Interview", icon: Mic, preview: "Interviewer: Can you tell me about your experience?" },
  { label: "Podcast", icon: Headphones, preview: "Host: Today we're joined by Dr. Smith." },
  { label: "Voice memo", icon: MicOff, preview: "Reminder to self: pick up dry cleaning..." },
  { label: "Lecture", icon: GraduationCap, preview: "So to summarize, the three main factors are cost, latency, and reliability." },
  { label: "Customer call", icon: Phone, preview: "Agent: How can I help you today? Customer: I'm having trouble with my order." },
]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return \`\${m}:\${s.toString().padStart(2, "0")}\`
}

export function SpeechToTextTemplate({ onSuggestionSelect, className }: { onSuggestionSelect?: (label: string) => void; className?: string }) {
  const [transcript, setTranscript] = useState("")
  const [hoveredSuggestion, setHoveredSuggestion] = useState(null)
  const [language, setLanguage] = useState("en")
  const [model, setModel] = useState("whisper_large")
  const [recording, setRecording] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [promoDismissed, setPromoDismissed] = useState(false)

  const tick = useCallback(() => setElapsedSeconds((s) => s + 1), [])
  useEffect(() => {
    if (!recording) return
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [recording, tick])

  const handleSuggestionClick = (label) => {
    const preview = defaultSuggestions.find((s) => s.label === label)?.preview ?? ""
    setTranscript((prev) => (prev ? prev + "\\n\\n" + preview : preview))
    setHoveredSuggestion(null)
    onSuggestionSelect?.(label)
  }
  const handleRecordToggle = () => {
    if (recording) {
      setRecording(false)
      setTranscript((prev) => prev ? prev + "\\n\\n[Recording " + formatTime(elapsedSeconds) + " — transcript would appear here.]" : "[Recording " + formatTime(elapsedSeconds) + " — transcript would appear here.]")
      setElapsedSeconds(0)
    } else {
      setRecording(true)
      setElapsedSeconds(0)
    }
  }
  const handleCopy = () => { if (transcript) void navigator.clipboard.writeText(transcript) }
  const handleDownload = () => {
    if (!transcript) return
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript-" + new Date().toISOString().slice(0, 10) + ".txt"
    a.click()
    URL.revokeObjectURL(url)
  }
  const previewFor = (label) => defaultSuggestions.find((s) => s.label === label)?.preview ?? ""
  const displayValue = hoveredSuggestion ? previewFor(hoveredSuggestion) : transcript
  const hasTranscript = transcript.length > 0

  return (
    <motion.div initial={rootVariants.initial} animate={rootVariants.animate} transition={rootTransition} className={cn("flex h-[600px] w-full max-w-5xl flex-col rounded-xl overflow-hidden shadow-lg border border-border bg-gradient-to-b from-background to-muted/20", className)}>
      <motion.header initial="initial" animate="animate" variants={headerVariants} className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20">
            <Mic className="h-4 w-4 text-primary" />
          </div>
          <h1 className="font-semibold text-base">Speech to Text</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" aria-label="Notifications"><Bell className="h-4 w-4" /></Button>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="text-xs bg-muted text-muted-foreground">U</AvatarFallback>
          </Avatar>
        </div>
      </motion.header>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <motion.div initial="initial" animate="animate" variants={mainLeftVariants} className="flex flex-1 flex-col min-w-0 min-h-0 p-4 gap-3 overflow-hidden">
          <div className="flex-1 min-h-0 flex flex-col">
            <Textarea placeholder="Start speaking or paste a recording—your transcript will appear here." className="h-full min-h-[100px] resize-none rounded-lg border border-border bg-muted/20 bg-gradient-to-b from-muted/10 to-muted/20 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2" value={displayValue} onChange={(e) => { setHoveredSuggestion(null); setTranscript(e.target.value) }} onFocus={() => setHoveredSuggestion(null)} readOnly={!!hoveredSuggestion} />
          </div>
          <div className="shrink-0 space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Get started with</p>
            <motion.div className="flex flex-wrap gap-2" variants={suggestionContainerVariants} initial="initial" animate="animate">
              {defaultSuggestions.map(({ label, icon: Icon }) => (
                <motion.div key={label} variants={suggestionItemVariants}>
                  <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-muted-foreground hover:text-foreground transition-colors" onClick={() => handleSuggestionClick(label)} onMouseEnter={() => setHoveredSuggestion(label)} onMouseLeave={() => setHoveredSuggestion(null)}>
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.aside initial="initial" animate="animate" variants={sidebarVariants} className="w-[280px] h-full shrink-0 border-l border-border flex flex-col overflow-hidden bg-gradient-to-b from-muted/10 to-muted/30">
          <Tabs defaultValue="settings" className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="shrink-0 px-3 pt-3 border-border">
              <TabsList className="w-full grid grid-cols-2 h-9">
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
                <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="settings" className="m-0 p-2 flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
              <AnimatePresence>
                {!promoDismissed && (
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                    <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                      <CardContent className="p-2 flex items-start gap-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center"><Mic className="h-5 w-5 text-primary" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Pro tip</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Choose a language or use Auto for best accuracy across mixed speech.</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground" onClick={() => setPromoDismissed(true)} aria-label="Dismiss"><X className="h-3.5 w-3.5" /></Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="shrink-0 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Language</p>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-10 w-full rounded-lg"><SelectValue placeholder="Language" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="shrink-0 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Model</p>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="h-10 w-full rounded-lg"><SelectValue placeholder="Model" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whisper_large">Whisper large</SelectItem>
                    <SelectItem value="whisper_base">Whisper base</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="history" className="m-0 p-2 flex-1 min-h-0 overflow-hidden flex items-center justify-center">
              <p className="text-sm text-muted-foreground text-center">No transcriptions yet.</p>
            </TabsContent>
          </Tabs>
        </motion.aside>
      </div>
      <motion.footer initial="initial" animate="animate" variants={footerVariants} className="flex items-center gap-4 border-t border-border px-4 py-3 shrink-0 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20">
        <div className="min-w-0 shrink">
          <p className="text-sm font-medium truncate">{recording ? "Recording" : "Default model"}</p>
          <p className="text-xs text-muted-foreground">{recording ? formatTime(elapsedSeconds) : "Speech to text"}</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 min-w-0">
          <div className="flex items-center gap-2 w-full max-w-md justify-center">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="icon" className={cn("h-10 w-10 shrink-0 rounded-full", recording ? "bg-destructive/20 hover:bg-destructive/30" : "bg-primary/20 hover:bg-primary/30")} onClick={handleRecordToggle} aria-label={recording ? "Stop recording" : "Start recording"}>
                {recording ? <Square className="h-5 w-5 text-destructive fill-destructive" /> : <Mic className="h-5 w-5 text-primary" />}
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Copy transcript" disabled={!hasTranscript} onClick={handleCopy}><Copy className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Download transcript" disabled={!hasTranscript} onClick={handleDownload}><Download className="h-4 w-4" /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="More options"><MoreVertical className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.footer>
    </motion.div>
  )
}
`,
  },
};
