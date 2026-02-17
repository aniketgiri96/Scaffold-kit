"use client";

import { motion } from "motion/react";

export const defaultViewport = { once: true, margin: "-40px 0px -40px 0px" };
export const defaultTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

export const fadeInUpVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  viewport?: typeof defaultViewport;
  transition?: typeof defaultTransition;
  as?: "div" | "section" | "span";
}

export function MotionWrapper({
  children,
  className,
  viewport = defaultViewport,
  transition = defaultTransition,
  as: Component = "div",
}: MotionWrapperProps) {
  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      initial={fadeInUpVariants.initial}
      whileInView={fadeInUpVariants.animate}
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export { motion };
