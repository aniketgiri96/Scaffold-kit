"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Send, CircleAlert, Copy, X, MoreVertical, Trash2 } from "lucide-react";
import { ChatMessageRow } from "./chat-message-row";
import { cn } from "@/lib/utils";

const messageTransition = { duration: 0.22, ease: "easeOut" as const };
const messageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const defaultSuggestedPrompts = ["Summarize", "Explain", "Improve"];
const defaultAttachments = [{ id: "a1", name: "file.pdf" }];

export interface AIChatPlaygroundProps {
  onClearChat?: () => void;
  onRetry?: () => void;
  onDismiss?: () => void;
  suggestedPrompts?: string[];
  onSelectPrompt?: (prompt: string) => void;
  attachments?: { id: string; name: string }[];
  onRemoveAttachment?: (id: string) => void;
  onSend?: (message: string) => void;
  className?: string;
}

const defaultMessages = [
  { id: "1", role: "user" as const, content: "Explain this code to me." },
  { id: "2", role: "assistant" as const, content: "Here's a simple helper:" },
];

const sampleCode = "const greet = (name: string) => `Hello, ${name}`;";

export function AIChatPlayground({
  onClearChat,
  onRetry,
  onDismiss,
  suggestedPrompts = defaultSuggestedPrompts,
  onSelectPrompt,
  attachments = defaultAttachments,
  onRemoveAttachment,
  onSend,
  className,
}: AIChatPlaygroundProps) {
  const [messages, setMessages] = useState(defaultMessages);
  const [showAssistantBlocks, setShowAssistantBlocks] = useState(true);
  const [model, setModel] = useState("gpt-4");
  const [inputValue, setInputValue] = useState("");

  const handleClearChat = () => {
    setMessages([]);
    setShowAssistantBlocks(false);
    onClearChat?.();
  };

  const handleCopyCode = () => {
    void navigator.clipboard.writeText(sampleCode);
  };

  const assistantBlockClasses = cn(
    "rounded-[var(--chat-bubble-radius)] border border-[var(--glass-border)] bg-[var(--chat-assistant-bg)]",
    "backdrop-blur-[var(--glass-blur)] max-w-[var(--chat-bubble-max-width,85%)]"
  );

  return (
    <div
      className={cn(
        "flex h-[520px] w-full max-w-4xl flex-col rounded-xl glass overflow-hidden",
        className
      )}
    >
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-sm">AI Chat</h2>
        <div className="flex items-center gap-2">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[180px] h-9" aria-label="Model">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                aria-label="Chat options"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  handleClearChat();
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4">
        <div
          className="flex flex-col"
          style={{ gap: "var(--chat-message-gap)" }}
        >
          <AnimatePresence mode="sync" initial={false}>
            {messages.map((msg) => (
              <ChatMessageRow
                key={msg.id}
                messageId={msg.id}
                role={msg.role}
                content={msg.content}
              />
            ))}
            {showAssistantBlocks && (
              <>
                <motion.div
                  layout
                  key="playground-code"
                  initial={messageVariants.initial}
                  animate={messageVariants.animate}
                  exit={messageVariants.exit}
                  transition={messageTransition}
                  className="flex gap-3 w-full justify-end flex-row-reverse"
                >
                  <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(assistantBlockClasses, "overflow-hidden flex-1 min-w-0")}>
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/80">
                      <Badge variant="secondary" className="text-xs font-mono">
                        ts
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 text-xs"
                        onClick={handleCopyCode}
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                    <pre className="p-3 text-sm font-mono overflow-x-auto">
                      <code className="text-foreground">{sampleCode}</code>
                    </pre>
                  </div>
                </motion.div>
                <motion.div
                  layout
                  key="playground-error"
                  initial={messageVariants.initial}
                  animate={messageVariants.animate}
                  exit={messageVariants.exit}
                  transition={messageTransition}
                  className="flex gap-3 w-full justify-end flex-row-reverse"
                >
                  <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 max-w-[var(--chat-bubble-max-width,85%)]">
                    <Alert variant="destructive" className="py-2">
                      <CircleAlert className="h-4 w-4" />
                      <AlertTitle className="text-sm">Error</AlertTitle>
                      <AlertDescription className="text-xs">
                        Request failed. Retry?
                      </AlertDescription>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-destructive/50 text-destructive hover:bg-destructive/10"
                          onClick={onRetry}
                        >
                          Retry
                        </Button>
                        <Button size="sm" variant="ghost" onClick={onDismiss}>
                          Dismiss
                        </Button>
                      </div>
                    </Alert>
                  </div>
                </motion.div>
                <motion.div
                  layout
                  key="playground-typing"
                  initial={messageVariants.initial}
                  animate={messageVariants.animate}
                  exit={messageVariants.exit}
                  transition={messageTransition}
                  className="flex gap-3 w-full justify-end flex-row-reverse"
                >
                  <Avatar className="h-8 w-8 shrink-0 border border-primary/30">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(assistantBlockClasses, "px-3 py-2.5 flex gap-1")}>
                    <span className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          {messages.length === 0 && !showAssistantBlocks && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Send a message or pick a prompt below.
            </p>
          )}
        </div>
      </ScrollArea>
      <div className="space-y-2 p-3 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p) => (
            <Button
              key={p}
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => onSelectPrompt?.(p)}
            >
              {p}
            </Button>
          ))}
        </div>
        <div className="w-full rounded-xl glass p-2 shadow-sm space-y-2">
          <div className="flex flex-wrap gap-1.5 px-1">
            {attachments.map((a) => (
              <span
                key={a.id}
                className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 text-xs"
              >
                {a.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 shrink-0"
                  onClick={() => onRemoveAttachment?.(a.id)}
                  aria-label={`Remove ${a.name}`}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask anything..."
              className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (inputValue.trim()) {
                    onSend?.(inputValue.trim());
                    setInputValue("");
                  }
                }
              }}
            />
            <Button
              size="icon"
              className="shrink-0 h-10 w-10 rounded-lg"
              onClick={() => {
                if (inputValue.trim()) {
                  onSend?.(inputValue.trim());
                  setInputValue("");
                }
              }}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
