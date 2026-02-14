"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { CHART_STROKE } from "@/features/ml/shared/chart-theme";

const mockRocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.42 },
  { fpr: 0.1, tpr: 0.65 },
  { fpr: 0.2, tpr: 0.82 },
  { fpr: 0.3, tpr: 0.90 },
  { fpr: 0.5, tpr: 0.95 },
  { fpr: 0.7, tpr: 0.98 },
  { fpr: 1, tpr: 1 },
];

export function RocAucCurve() {
  return (
    <div className="h-[320px] w-full rounded-lg border border-border bg-card p-4">
      <div className="mb-2 text-sm font-medium">ROC curve (AUC = 0.94)</div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={mockRocData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="fpr" name="FPR" tick={{ fontSize: 12 }} />
          <YAxis dataKey="tpr" name="TPR" domain={[0, 1]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number) => value.toFixed(3)} />
          <ReferenceLine y={1} x={0} stroke="var(--muted-foreground)" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="tpr"
            stroke={CHART_STROKE.primary}
            strokeWidth={2}
            dot={{ r: 2 }}
            name="TPR"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
