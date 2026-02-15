"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const messageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const transition = { duration: 0.22, ease: "easeOut" as const };

export interface ChatMessageRowProps {
  role: "user" | "assistant";
  content: string;
  className?: string;
  /** Optional message id for list keys / delete */
  messageId?: string;
}

export function ChatMessageRow({
  role,
  content,
  className,
}: ChatMessageRowProps) {
  const isUser = role === "user";

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
      <Avatar
        className={cn(
          "h-8 w-8 shrink-0 border",
          isUser ? "border-border" : "border-primary/30"
        )}
      >
        <AvatarFallback
          className={cn(
            "text-xs",
            isUser ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"
          )}
        >
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[var(--chat-bubble-max-width,85%)] rounded-[var(--chat-bubble-radius)] px-3 py-2 text-sm backdrop-filter blur-[var(--glass-blur)] -webkit-backdrop-filter blur-[var(--glass-blur)] border",
          isUser
            ? "bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] border-primary/20"
            : "bg-[var(--chat-assistant-bg)] text-[var(--chat-assistant-text)] border-[var(--glass-border)]"
        )}
      >
        <p className="text-foreground">{content}</p>
      </div>
    </motion.div>
  );
}
