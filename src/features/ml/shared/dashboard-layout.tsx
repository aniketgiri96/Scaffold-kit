"use client";

import * as React from "react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  /** Optional title for the dashboard (e.g. page heading). */
  title?: string;
  /** Optional description shown below the title. */
  description?: string;
}

/**
 * Minimal wrapper for ML dashboard pages. Provides consistent spacing.
 * Add loading/error boundaries when wiring async data.
 */
export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="space-y-4">
      {(title ?? description) && (
        <div className="space-y-1">
          {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
