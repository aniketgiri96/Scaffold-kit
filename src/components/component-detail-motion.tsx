"use client";

import { motion } from "motion/react";
import * as React from "react";

export function ComponentDetailMotion({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  return (
    <div className="space-y-6">
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.06,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
