"use client";

/**
 * Recharts theme using design system CSS variables (--chart-1 through --chart-5).
 * Values are defined in globals.css as full hsl() so charts respect light/dark and brand.
 */
export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

/** Default stroke colors for line/area charts (first two). */
export const CHART_STROKE = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
} as const;

/** Single color for bars/heatmap when only one series. */
export const CHART_PRIMARY = CHART_COLORS[0];
