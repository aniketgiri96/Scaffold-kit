"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MEET_CARD_BG = "#4f46e5";
const DEFAULT_GLOW = "rgba(97, 98, 195, 0.6)";

export interface GoogleMeetCardProps extends React.ComponentPropsWithoutRef<"div"> {
  /** When true, shows glass and strong per-card-color glow around the outer card */
  isSpeaking?: boolean;
  /** When true, shows red muted mic icon; when false, shows white mic icon */
  isMuted?: boolean;
  /** Optional display name (e.g. for fallback initials and bottom bar) */
  displayName?: string;
  /** Optional avatar image URL */
  avatarSrc?: string;
  /** Optional background color (e.g. from user profile); glow when speaking matches this */
  themeColor?: string;
}

function getInitials(displayName?: string): string {
  if (!displayName?.trim()) return "?";
  const parts = displayName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return displayName.slice(0, 2).toUpperCase();
}

const GoogleMeetCard = React.forwardRef<HTMLDivElement, GoogleMeetCardProps>(
  (
    {
      isSpeaking = false,
      isMuted = false,
      displayName,
      avatarSrc,
      themeColor,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const initials = getInitials(displayName);
    const bgColor = themeColor ?? MEET_CARD_BG;
    const glowColor = themeColor ? `${themeColor}99` : DEFAULT_GLOW;

    return (
      <div
        ref={ref}
        className={cn("relative w-full", "aspect-[3/3]", className)}
        style={
          isSpeaking
            ? { ["--card-glow" as string]: glowColor }
            : undefined
        }
        {...props}
      >
        {/* Speaking: glass + strong per-card-color glow around the outer card */}
        {isSpeaking && (
          <div
            className="absolute inset-0 pointer-events-none rounded-lg backdrop-blur-md bg-white/5 border border-white/0.2"
            style={{ boxShadow: `0 0 30px var(--card-glow), 0 0 40px var(--card-glow)` }}
            aria-hidden
          />
        )}

        {/* Card content */}
        <div
          className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-[0_0_24px_var(--glow-primary)] bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600"
          style={{
            ...(themeColor && { backgroundColor: themeColor, backgroundImage: 'none' }),
            ...style,
          }}
        >
          {/* Central area: avatar + glass halo when speaking */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {/* Glass effect behind avatar when speaking */}
            {isSpeaking && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <div
                  className="h-[36%] min-h-[64px] max-h-[120px] aspect-square w-auto rounded-full backdrop-blur-md bg-white/5 border border-white/10"
                  style={{ boxShadow: `0 0 40px var(--card-glow), 0 0 64px var(--card-glow)` }}
                />
              </div>
            )}
            <Avatar
              className={cn(
                "relative z-10 shrink-0 overflow-hidden rounded-full border-2 border-white/20",
                "h-[28%] min-h-[48px] max-h-[96px] aspect-square w-auto"
              )}
            >
              <AvatarImage
                src={avatarSrc}
                alt={displayName ?? "AG"}
                className="object-cover rounded-full"
              />
              <AvatarFallback className="bg-white/20 text-white text-xl rounded-full">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {children}
      </div>
    );
  }
);

GoogleMeetCard.displayName = "GoogleMeetCard";

export { GoogleMeetCard };
