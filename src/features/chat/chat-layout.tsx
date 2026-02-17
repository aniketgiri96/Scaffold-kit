"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send } from "lucide-react";
import { ChatMessageRow } from "./chat-message-row";
import { ChatConversationItem } from "./chat-conversation-item";

export interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ConversationItem {
  id: string;
  title: string;
}

export interface ChatLayoutProps {
  /** Initial conversations for sidebar (optional; used for preview/demo) */
  initialConversations?: ConversationItem[];
  /** Initial messages (optional; used for preview/demo) */
  initialMessages?: MessageItem[];
  /** Called when user deletes a conversation */
  onDeleteConversation?: (id: string) => void;
  /** Optional class for the root container */
  className?: string;
}

const defaultConversations: ConversationItem[] = [
  { id: "1", title: "Summary doc" },
  { id: "2", title: "Code review" },
  { id: "3", title: "API design" },
];

const defaultMessages: MessageItem[] = [
  {
    id: "m1",
    role: "user",
    content: "What's the best way to structure this API?",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "Consider REST with versioned routes and clear status codes. I can draft a spec.",
  },
];

export function ChatLayout({
  initialConversations = defaultConversations,
  initialMessages = defaultMessages,
  onDeleteConversation,
  className,
}: ChatLayoutProps) {
  const [conversations, setConversations] = useState<ConversationItem[]>(
    initialConversations
  );
  const [messages] = useState<MessageItem[]>(initialMessages);
  const [activeId, setActiveId] = useState<string>(initialConversations[0]?.id ?? "1");

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id && conversations.length > 1) {
      const next = conversations.find((c) => c.id !== id);
      setActiveId(next?.id ?? "");
    }
    onDeleteConversation?.(id);
  };

  return (
    <div className={className}>
      <div className="flex h-[420px] w-full max-w-4xl rounded-xl glass overflow-hidden">
        <aside className="w-56 glass border-0 border-r border-border p-3 flex flex-col gap-2">
          <Button variant="ghost" size="sm" className="justify-start">
            <Bot className="mr-2 h-4 w-4" />
            New chat
          </Button>
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              <AnimatePresence mode="sync" initial={false}>
                {conversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    layout
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ChatConversationItem
                      id={conv.id}
                      title={conv.title}
                      isActive={activeId === conv.id}
                      onDelete={handleDeleteConversation}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 flex flex-col min-w-0">
          <ScrollArea className="flex-1 p-4">
            <div
              className="space-y-4"
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
              </AnimatePresence>
            </div>
          </ScrollArea>
          <div className="p-3 border-t border-border">
            <div className="flex gap-2 rounded-lg glass p-2">
              <Input
                placeholder="Type a message..."
                className="border-0 bg-transparent focus-visible:ring-0"
              />
              <Button size="icon" className="shrink-0 h-9 w-9">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
