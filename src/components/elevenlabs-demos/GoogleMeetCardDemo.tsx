"use client";

import { useState, useEffect } from "react";
import { GoogleMeetCard } from "@/components/ui/google-meet-card";

export function GoogleMeetCardDemo() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const speakingInterval = setInterval(() => {
      setIsSpeaking((prev) => !prev);
    }, 2500);
    const muteInterval = setInterval(() => {
      setIsMuted((prev) => !prev);
    }, 3500);
    return () => {
      clearInterval(speakingInterval);
      clearInterval(muteInterval);
    };
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <div className="w-full">
        <GoogleMeetCard
          isSpeaking={isSpeaking}
          isMuted={isMuted}
          displayName="User"
        />
      </div>
    </div>
  );
}
