"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_STROKE } from "@/features/ml/shared/chart-theme";
import type { LossAccuracyPoint } from "@/features/ml/shared/types";

const DEFAULT_DATA: LossAccuracyPoint[] = [
  { step: 0, loss: 0.89, accuracy: 0.35 },
  { step: 100, loss: 0.62, accuracy: 0.58 },
  { step: 200, loss: 0.41, accuracy: 0.72 },
  { step: 300, loss: 0.28, accuracy: 0.82 },
  { step: 400, loss: 0.19, accuracy: 0.88 },
  { step: 500, loss: 0.14, accuracy: 0.92 },
  { step: 600, loss: 0.11, accuracy: 0.94 },
  { step: 700, loss: 0.09, accuracy: 0.96 },
  { step: 800, loss: 0.07, accuracy: 0.97 },
  { step: 900, loss: 0.06, accuracy: 0.98 },
];

export interface TrainingLossAccuracyCurvesProps {
  data?: LossAccuracyPoint[];
}

export function TrainingLossAccuracyCurves({ data = DEFAULT_DATA }: TrainingLossAccuracyCurvesProps = {}) {
  return (
    <div className="h-[320px] w-full rounded-lg border border-border bg-card p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="step" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="loss"
            name="Loss"
            stroke={CHART_STROKE.primary}
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="accuracy"
            name="Accuracy"
            stroke={CHART_STROKE.secondary}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
