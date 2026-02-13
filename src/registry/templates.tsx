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
    description: "A single message row for user or assistant with avatar and content.",
    type: "block",
    component: (
      <div className="flex gap-3 max-w-md">
        <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
          <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
        </Avatar>
        <div className="rounded-lg glass px-3 py-2 text-sm">
          <p className="text-foreground">Here’s a summary of the changes. Should I apply them?</p>
        </div>
      </div>
    ),
    code: `import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ChatMessageRow({ isUser, content }: { isUser: boolean; content: string }) {
  return (
    <div className="flex gap-3 max-w-md">
      <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
        <AvatarFallback className="bg-primary/20 text-primary text-xs">
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div className="rounded-lg glass px-3 py-2 text-sm">
        <p className="text-foreground">{content}</p>
      </div>
    </div>
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
    description: "Full layout with sidebar and main chat thread area.",
    type: "page",
    component: (
      <div className="flex h-[420px] w-full max-w-4xl rounded-xl glass overflow-hidden">
        <aside className="w-56 glass border-0 border-r border-border p-3 flex flex-col gap-2">
          <Button variant="ghost" size="sm" className="justify-start">
            <Bot className="mr-2 h-4 w-4" />
            New chat
          </Button>
          <ScrollArea className="flex-1">
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="rounded-md px-2 py-1.5 bg-accent/50 text-foreground">Summary doc</div>
              <div className="rounded-md px-2 py-1.5 hover:bg-accent/30 cursor-pointer">Code review</div>
              <div className="rounded-md px-2 py-1.5 hover:bg-accent/30 cursor-pointer">API design</div>
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 flex flex-col min-w-0">
          <ScrollArea className="flex-1 p-4 space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className="text-xs">U</AvatarFallback></Avatar>
              <div className="rounded-lg glass px-3 py-2 text-sm">What’s the best way to structure this API?</div>
            </div>
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0 border border-primary/30"><AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback></Avatar>
              <div className="rounded-lg glass px-3 py-2 text-sm">Consider REST with versioned routes and clear status codes. I can draft a spec.</div>
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
    ),
    code: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send } from "lucide-react"

export function ChatLayout() {
  return (
    <div className="flex h-[420px] w-full max-w-4xl rounded-xl glass overflow-hidden">
      <aside className="w-56 glass border-0 border-r border-border p-3 flex flex-col gap-2">
        <Button variant="ghost" size="sm" className="justify-start">
          <Bot className="mr-2 h-4 w-4" /> New chat
        </Button>
        <ScrollArea className="flex-1">
          {/* Conversation list */}
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col min-w-0">
        <ScrollArea className="flex-1 p-4 space-y-4">
          {/* Messages */}
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
      "Full-page-style layout: header with model selector, message list (user, AI, code block, error, typing), suggested prompts, and prompt bar with attachments.",
    type: "page",
    component: (
      <div className="flex h-[520px] w-full max-w-4xl flex-col rounded-xl glass overflow-hidden">
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-semibold text-sm">AI Chat</h2>
          <Select defaultValue="gpt-4">
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
        </header>
        <ScrollArea className="flex-1 p-4 space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
            <div className="rounded-lg glass px-3 py-2 text-sm">Explain this code to me.</div>
          </div>
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
            </Avatar>
            <div className="rounded-lg glass px-3 py-2 text-sm">
              Here’s a simple helper:
            </div>
          </div>
          <div className="flex gap-3 max-w-md pl-11">
            <div className="rounded-lg glass overflow-hidden flex-1">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/80">
                <Badge variant="secondary" className="text-xs font-mono">ts</Badge>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
              <pre className="p-3 text-sm font-mono overflow-x-auto">
                <code>{`const greet = (name: string) => \`Hello, \${name}\`;`}</code>
              </pre>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
            </Avatar>
            <Alert variant="destructive" className="flex-1 py-2">
              <CircleAlert className="h-4 w-4" />
              <AlertTitle className="text-sm">Error</AlertTitle>
              <AlertDescription className="text-xs">Request failed. Retry?</AlertDescription>
              <Button size="sm" variant="outline" className="mt-2 border-destructive/50 text-destructive hover:bg-destructive/10">
                Retry
              </Button>
            </Alert>
          </div>
          <div className="flex gap-3">
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
        </ScrollArea>
        <div className="space-y-2 p-3 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              Summarize
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              Explain
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              Improve
            </Button>
          </div>
          <div className="w-full rounded-xl glass p-2 shadow-sm space-y-2">
            <div className="flex flex-wrap gap-1.5 px-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 text-xs">
                file.pdf
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
        </div>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CircleAlert, Copy, X } from "lucide-react"

export function AIChatPlayground() {
  return (
    <div className="flex h-[520px] w-full max-w-4xl flex-col rounded-xl glass overflow-hidden">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-sm">AI Chat</h2>
        <Select>
          <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Model" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
          </SelectContent>
        </Select>
      </header>
      <ScrollArea className="flex-1 p-4 space-y-4">
        {/* Messages: user, AI, code block, error, typing indicator */}
      </ScrollArea>
      <div className="space-y-2 p-3 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full text-xs">Summarize</Button>
          <Button variant="outline" size="sm" className="rounded-full text-xs">Explain</Button>
          <Button variant="outline" size="sm" className="rounded-full text-xs">Improve</Button>
        </div>
        <div className="w-full rounded-xl glass p-2 shadow-sm space-y-2">
          <div className="flex flex-wrap gap-1.5 px-1">{/* Attachment chips */}</div>
          <div className="flex gap-2">
            <Textarea placeholder="Ask anything..." className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0" rows={1} />
            <Button size="icon" className="shrink-0 h-10 w-10 rounded-lg"><Send className="h-4 w-4" /><span className="sr-only">Send</span></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
`,
  },
};
