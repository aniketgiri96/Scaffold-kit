"use client";

import { useMemo } from "react";

const mockMatrix = [
  [82, 5, 2, 1],
  [3, 75, 8, 4],
  [1, 6, 88, 2],
  [0, 2, 3, 91],
];
const labels = ["Class A", "Class B", "Class C", "Class D"];

function getHeatOpacity(value: number, max: number) {
  return max > 0 ? value / max : 0;
}

export function ConfusionMatrixHeatmap() {
  const max = useMemo(() => Math.max(...mockMatrix.flat()), []);

  return (
    <div className="w-full overflow-auto rounded-lg border border-border bg-card p-4">
      <div className="min-w-[280px]">
        <div
          className="mb-2 grid gap-0.5 text-center text-xs font-medium text-muted-foreground"
          style={{ gridTemplateColumns: `auto repeat(${labels.length}, 1fr)` }}
        >
          <div />
          {labels.map((l) => (
            <div key={l} className="truncate px-1">
              {l}
            </div>
          ))}
        </div>
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: `auto repeat(${labels.length}, 1fr)` }}
        >
          {mockMatrix.map((row, i) => (
            <div
              key={i}
              className="contents"
            >
              <div className="flex items-center justify-end pr-2 text-xs font-medium text-muted-foreground">
                {labels[i]}
              </div>
              {row.map((cell, j) => (
                <div
                  key={j}
                  className="relative flex h-12 min-w-[3rem] items-center justify-center rounded border border-border text-sm font-medium text-foreground"
                >
                  <div
                    className="absolute inset-0 rounded border border-transparent bg-primary"
                    style={{ opacity: 0.15 + getHeatOpacity(cell, max) * 0.65 }}
                    aria-hidden
                  />
                  <span className="relative z-10">{cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Predicted → / Actual ↓</p>
      </div>
    </div>
  );
}
