"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_REVEALED_TEXT =
  "Add it to the template — similar to Text to Speech.";
const DEFAULT_PLACEHOLDER = "Or type a message...";

/** ElevenLabs Orb gradient colors (https://ui.elevenlabs.io/docs/components/orb) */
const ELEVENLABS_ORB_COLORS = {
  light: "#CADCFC",
  mid: "#A0B9D1",
} as const;

/** Spring for resize-on-click feel (slightly softer for gentle overshoot). */
const bubbleSizeTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};
const textTransition = { duration: 0.25, ease: "easeOut" as const };

export interface VoicePromptWithBubbleProps {
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  revealedText?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  /** Callback when focus state changes (e.g. for parent to show/hide TTS content). */
  onFocusChange?: (focused: boolean) => void;
}

export function VoicePromptWithBubble({
  className,
  onFocus,
  onBlur,
  placeholder = DEFAULT_PLACEHOLDER,
  revealedText = DEFAULT_REVEALED_TEXT,
  inputValue,
  onInputChange,
  onFocusChange,
}: VoicePromptWithBubbleProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const isControlled = inputValue !== undefined && onInputChange !== undefined;
  const [localValue, setLocalValue] = useState("");

  const value = isControlled ? inputValue : localValue;
  const setValue = isControlled ? onInputChange : setLocalValue;

  const handleFocus = () => {
    setInputFocused(true);
    onFocusChange?.(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setInputFocused(false);
    onFocusChange?.(false);
    onBlur?.();
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 sm:gap-8 min-h-[200px] sm:min-h-[240px]",
        className
      )}
    >
      {/* ElevenLabs-style orb: large when idle, small when input focused (resize-on-click feel) */}
      <motion.div
        className="relative flex-shrink-0 rounded-full select-none pointer-events-none origin-center"
        initial={false}
        animate={{
          width: inputFocused ? 56 : 240,
          height: inputFocused ? 56 : 240,
          scale: inputFocused ? [1, 1.02, 1] : 1,
        }}
        transition={{
          width: bubbleSizeTransition,
          height: bubbleSizeTransition,
          scale: { duration: 0.2, ease: "easeOut" },
        }}
        style={{
          maxWidth: "min(280px, 70vw)",
          maxHeight: "min(280px, 70vw)",
          transformOrigin: "center",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full w-full h-full overflow-hidden origin-center"
          style={{
            background: `radial-gradient(ellipse 35% 35% at 28% 28%, rgba(255,255,255,0.55), transparent 50%), radial-gradient(ellipse 70% 70% at 50% 50%, ${ELEVENLABS_ORB_COLORS.light}E6, transparent 55%), radial-gradient(ellipse 85% 85% at 50% 50%, ${ELEVENLABS_ORB_COLORS.mid}80, transparent 60%), radial-gradient(ellipse 100% 100% at 50% 50%, ${ELEVENLABS_ORB_COLORS.mid}26, transparent 70%)`,
            boxShadow: `0 0 80px ${ELEVENLABS_ORB_COLORS.light}59, 0 0 120px ${ELEVENLABS_ORB_COLORS.mid}33, inset -8px -8px 24px rgba(0,0,0,0.06), inset 8px 8px 24px rgba(255,255,255,0.25)`,
            border: "1px solid rgba(255,255,255,0.35)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            transformOrigin: "center",
          }}
          animate={{
            scale: inputFocused ? 1 : [1, 1.02, 1],
          }}
          transition={{
            scale: {
              duration: 3.5,
              repeat: inputFocused ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />
        {/* Inner fluid glow — ElevenLabs-style animation */}
        <motion.div
          className="absolute inset-0 rounded-full w-full h-full overflow-hidden origin-center pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${ELEVENLABS_ORB_COLORS.light}40, transparent 70%)`,
            transformOrigin: "center",
          }}
          animate={
            inputFocused
              ? { opacity: 0 }
              : {
                  opacity: [0.4, 0.85, 0.4],
                }
          }
          transition={{
            opacity: {
              duration: 4,
              repeat: inputFocused ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />
      </motion.div>

      {/* Revealed text when focused */}
      <AnimatePresence mode="wait">
        {inputFocused && (
          <motion.p
            key="revealed-text"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={textTransition}
            className="text-sm sm:text-base text-muted-foreground text-center max-w-md px-2"
          >
            {revealedText}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Input row: voice icon + input */}
      <div className="w-full max-w-md flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-3 py-2 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2 transition-all">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Voice input"
        >
          <Phone className="h-4 w-4" />
        </button>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex-1 min-w-0 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm sm:text-base"
          aria-label={placeholder}
        />
      </div>
    </div>
  );
}
