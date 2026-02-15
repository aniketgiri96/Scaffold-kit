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
};
