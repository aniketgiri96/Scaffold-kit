"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      {/* Mesh / ambient orbs */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-30 dark:opacity-20"
        style={{
          background: "var(--gradient-accent)",
        }}
        animate={{
          scale: [1.02, 1, 1.02],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, var(--glow-primary) 0%, transparent 50%)",
        }}
      />
    </>
  );
}
