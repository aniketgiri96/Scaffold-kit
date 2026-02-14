"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockDiffs = [
  { metric: "Accuracy", before: 0.854, after: 0.902, delta: 0.048 },
  { metric: "F1", before: 0.842, after: 0.891, delta: 0.049 },
  { metric: "Loss", before: 0.41, after: 0.24, delta: -0.17 },
];

function DeltaBadge({ delta, lowerIsBetter }: { delta: number; lowerIsBetter?: boolean }) {
  const isNeutral = delta === 0;
  const isImprovement = lowerIsBetter ? delta < 0 : delta > 0;
  const label =
    isNeutral ? "0" : delta > 0 ? `+${(delta * 100).toFixed(1)}%` : `${(delta * 100).toFixed(1)}%`;
  const lossLabel = isNeutral ? "0" : delta.toFixed(2);
  return (
    <span
      className={
        isNeutral
          ? "text-muted-foreground"
          : isImprovement
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
      }
    >
      {lowerIsBetter ? lossLabel : label}
    </span>
  );
}

export function MetricDiffBlock() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-base">Metric diff (before → after)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockDiffs.map((row) => (
            <div
              key={row.metric}
              className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0"
            >
              <span className="font-medium">{row.metric}</span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  {typeof row.before === "number" && row.before < 1
                    ? (row.before * 100).toFixed(1) + "%"
                    : row.before}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="font-medium">
                  {typeof row.after === "number" && row.after < 1
                    ? (row.after * 100).toFixed(1) + "%"
                    : row.after}
                </span>
                <DeltaBadge delta={row.delta} lowerIsBetter={row.metric === "Loss"} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
