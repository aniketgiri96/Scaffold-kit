import * as React from "react";
import { MLModelPerformanceDashboard } from "@/features/ml/dashboards/ml-model-performance-dashboard";
import { ResourceUsageDashboard } from "@/features/ml/dashboards/resource-usage-dashboard";
import { TrainingLossAccuracyCurves } from "@/features/ml/charts/training-loss-accuracy-curves";
import { ConfusionMatrixHeatmap } from "@/features/ml/charts/confusion-matrix-heatmap";
import { RocAucCurve } from "@/features/ml/charts/roc-auc-curve";

export type MLTemplateType = "block" | "page";

export type MLCategory =
  | "Dashboard"
  | "Charts"
  | "Model Management"
  | "Data"
  | "Training"
  | "Inference"
  | "LLM/NLP"
  | "Computer Vision"
  | "Utilities"
  | "Reporting"
  | "Status";

export interface MLTemplateEntry {
  slug: string;
  name: string;
  description: string;
  type: MLTemplateType;
  category: MLCategory;
  component: React.ReactNode;
  code: string;
  examples?: { title: string; component: React.ReactNode; code: string }[];
}

export const ML_CATEGORY_ORDER: MLCategory[] = [
  "Dashboard",
  "Charts",
  "Model Management",
  "Data",
  "Training",
  "Inference",
  "LLM/NLP",
  "Computer Vision",
  "Utilities",
  "Reporting",
  "Status",
];

export const mlRegistry: Record<string, MLTemplateEntry> = {
  "ml-model-performance-dashboard": {
    slug: "ml-model-performance-dashboard",
    name: "ML Model Performance Dashboard",
    description: "Dashboard showing model accuracy, F1, loss and accuracy-over-epochs chart.",
    type: "page",
    category: "Dashboard",
    component: <MLModelPerformanceDashboard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CHART_STROKE } from "@/features/ml/shared/chart-theme"

export function MLModelPerformanceDashboard() {
  const data = [/* your metrics */]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>...</Card>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <Line dataKey="train" stroke={CHART_STROKE.primary} />
          <Line dataKey="val" stroke={CHART_STROKE.secondary} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
`,
  },
  "resource-usage-dashboard": {
    slug: "resource-usage-dashboard",
    name: "Resource Usage Dashboard",
    description: "GPU/CPU/Memory utilization cards with progress bars and cluster summary.",
    type: "page",
    category: "Dashboard",
    component: <ResourceUsageDashboard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ResourceUsageDashboard() {
  const resources = [{ name: "GPU 0", usage: 78 }, ...]
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {resources.map((r) => (
        <Card key={r.name}>
          <CardHeader>...</CardHeader>
          <CardContent>
            <Progress value={r.usage} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
`,
  },
  "training-loss-accuracy-curves": {
    slug: "training-loss-accuracy-curves",
    name: "Training Loss/Accuracy Curves",
    description: "Dual-axis line chart for training loss and accuracy over steps.",
    type: "block",
    category: "Charts",
    component: <TrainingLossAccuracyCurves />,
    code: `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { CHART_STROKE } from "@/features/ml/shared/chart-theme"

export function TrainingLossAccuracyCurves({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <Line yAxisId="left" dataKey="loss" stroke={CHART_STROKE.primary} />
        <Line yAxisId="right" dataKey="accuracy" stroke={CHART_STROKE.secondary} />
      </LineChart>
    </ResponsiveContainer>
  )
}
`,
  },
  "confusion-matrix-heatmap": {
    slug: "confusion-matrix-heatmap",
    name: "Confusion Matrix Heatmap",
    description: "Heatmap grid for classification confusion matrix with labels.",
    type: "block",
    category: "Charts",
    component: <ConfusionMatrixHeatmap />,
    code: `import { useMemo } from "react"

export function ConfusionMatrixHeatmap({ matrix, labels }) {
  const max = useMemo(() => Math.max(...matrix.flat()), [matrix])
  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: \`auto repeat(\${labels.length}, 1fr)\` }}>
      {matrix.map((row, i) => (
        <div key={i} className="contents">
          <div>{labels[i]}</div>
          {row.map((cell, j) => (
            <div key={j} style={{ opacity: cell / max }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
`,
  },
  "roc-auc-curve": {
    slug: "roc-auc-curve",
    name: "ROC/AUC Curve Display",
    description: "ROC curve line chart with FPR/TPR axes and optional AUC label.",
    type: "block",
    category: "Charts",
    component: <RocAucCurve />,
    code: `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { CHART_STROKE } from "@/features/ml/shared/chart-theme"

export function RocAucCurve({ data, auc }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="fpr" />
        <YAxis dataKey="tpr" domain={[0, 1]} />
        <Line type="monotone" dataKey="tpr" stroke={CHART_STROKE.primary} />
        <ReferenceLine y={1} x={0} strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  )
}
`,
  },
};
