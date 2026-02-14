import * as React from "react";
import { MLModelPerformanceDashboard } from "@/features/ml/dashboards/ml-model-performance-dashboard";
import { ResourceUsageDashboard } from "@/features/ml/dashboards/resource-usage-dashboard";
import { TrainingLossAccuracyCurves } from "@/features/ml/charts/training-loss-accuracy-curves";
import { ConfusionMatrixHeatmap } from "@/features/ml/charts/confusion-matrix-heatmap";
import { RocAucCurve } from "@/features/ml/charts/roc-auc-curve";
import { ModelCard } from "@/features/ml/model-management/model-card";
import { ModelVersionTable } from "@/features/ml/model-management/model-version-table";
import { DatasetCard } from "@/features/ml/data/dataset-card";
import { LabelDistributionChart } from "@/features/ml/data/label-distribution-chart";
import { TrainingRunConfigCard } from "@/features/ml/training/training-run-config-card";
import { ExperimentRunTable } from "@/features/ml/training/experiment-run-table";
import { PredictionInputResultCard } from "@/features/ml/inference/prediction-input-result-card";
import { BatchInferenceProgress } from "@/features/ml/inference/batch-inference-progress";
import { PromptResponseBlock } from "@/features/ml/llm-nlp/prompt-response-block";
import { TokenUsageSummary } from "@/features/ml/llm-nlp/token-usage-summary";
import { ImagePredictionCard } from "@/features/ml/computer-vision/image-prediction-card";
import { MetricDiffBlock } from "@/features/ml/utilities/metric-diff-block";
import { StatusPillRow } from "@/features/ml/utilities/status-pill-row";
import { RunReportSummaryCard } from "@/features/ml/reporting/run-report-summary-card";
import { PipelineStatusTimeline } from "@/features/ml/status/pipeline-status-timeline";
import { HealthCheckSummary } from "@/features/ml/status/health-check-summary";

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
  "model-card": {
    slug: "model-card",
    name: "Model Card",
    description: "Card showing model metadata: name, version, framework, size, last updated.",
    type: "block",
    category: "Model Management",
    component: <ModelCard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ModelCard({ name, version, framework, size, status }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Badge>{status}</Badge>
      </CardHeader>
      <CardContent>
        <div>Version: {version}</div>
        <div>Framework: {framework}</div>
        <div>Size: {size}</div>
        <Button size="sm">Deploy</Button>
      </CardContent>
    </Card>
  )
}
`,
  },
  "model-version-table": {
    slug: "model-version-table",
    name: "Model Version Table",
    description: "Table of model versions with metrics, status, and deploy actions.",
    type: "block",
    category: "Model Management",
    component: <ModelVersionTable />,
    code: `import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ModelVersionTable({ versions }) {
  return (
    <Card>
      <CardHeader><Button size="sm">Register version</Button></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((v) => (
              <TableRow key={v.version}>
                <TableCell>{v.version}</TableCell>
                <TableCell>{(v.accuracy * 100).toFixed(1)}%</TableCell>
                <TableCell><Badge>{v.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
`,
  },
  "dataset-card": {
    slug: "dataset-card",
    name: "Dataset Card",
    description: "Card for dataset metadata: name, size, train/val/test splits.",
    type: "block",
    category: "Data",
    component: <DatasetCard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DatasetCard({ name, size, train, val, test }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Badge variant="secondary">{size}</Badge>
      </CardHeader>
      <CardContent>
        <div>Train: {train} samples</div>
        <div>Val: {val} samples</div>
        <div>Test: {test} samples</div>
        <Button size="sm">Preview</Button>
      </CardContent>
    </Card>
  )
}
`,
  },
  "label-distribution-chart": {
    slug: "label-distribution-chart",
    name: "Label Distribution Chart",
    description: "Bar chart showing class/label distribution in a dataset.",
    type: "block",
    category: "Data",
    component: <LabelDistributionChart />,
    code: `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LabelDistributionChart({ data }) {
  return (
    <Card>
      <CardHeader><CardTitle>Label distribution</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
`,
  },
  "training-run-config-card": {
    slug: "training-run-config-card",
    name: "Training Run Config Card",
    description: "Card showing run ID, dataset, duration, hyperparams (epochs, batch size, lr).",
    type: "block",
    category: "Training",
    component: <TrainingRunConfigCard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TrainingRunConfigCard({ runId, dataset, duration, epochs, batchSize, lr }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Run config</CardTitle>
        <Badge>Completed</Badge>
      </CardHeader>
      <CardContent>
        <div>Run ID: {runId}</div>
        <div>Dataset: {dataset}</div>
        <div>Duration: {duration}</div>
        <div>Epochs: {epochs}, Batch: {batchSize}, LR: {lr}</div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "experiment-run-table": {
    slug: "experiment-run-table",
    name: "Experiment Run Table",
    description: "Table of experiment runs with run ID, status, metrics, and view link.",
    type: "block",
    category: "Training",
    component: <ExperimentRunTable />,
    code: `import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ExperimentRunTable({ runs }) {
  return (
    <Card>
      <CardHeader><Button size="sm">New run</Button></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Run ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {runs.map((r) => (
              <TableRow key={r.runId}>
                <TableCell className="font-mono text-xs">{r.runId}</TableCell>
                <TableCell><Badge>{r.status}</Badge></TableCell>
                <TableCell>{r.accuracy != null ? (r.accuracy * 100).toFixed(1) + "%" : "—"}</TableCell>
                <TableCell>{r.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
`,
  },
  "prediction-input-result-card": {
    slug: "prediction-input-result-card",
    name: "Prediction Input Result Card",
    description: "Input field for prediction and result display (e.g. class labels and scores).",
    type: "block",
    category: "Inference",
    component: <PredictionInputResultCard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function PredictionInputResultCard() {
  return (
    <Card>
      <CardHeader><CardTitle>Try model</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter text for prediction..." />
        <Button className="w-full">Predict</Button>
        <div className="rounded-lg border p-3">
          <p className="text-xs text-muted-foreground mb-1">Result</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Positive (0.92)</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "batch-inference-progress": {
    slug: "batch-inference-progress",
    name: "Batch Inference Progress",
    description: "Progress and counts for batch inference (total, done, failed).",
    type: "block",
    category: "Inference",
    component: <BatchInferenceProgress />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function BatchInferenceProgress({ total, done, failed, jobId }) {
  const progressPct = total > 0 ? (done / total) * 100 : 0
  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch inference</CardTitle>
        <Badge variant="secondary">Running</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-mono text-muted-foreground">{jobId}</p>
        <Progress value={progressPct} />
        <div className="flex gap-4 text-sm">
          <span>Done: {done}</span>
          <span>Failed: {failed}</span>
          <span>Total: {total}</span>
        </div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "prompt-response-block": {
    slug: "prompt-response-block",
    name: "Prompt Response Block",
    description: "Side-by-side prompt (user) and response (model) for LLM/NLP UIs.",
    type: "block",
    category: "LLM/NLP",
    component: <PromptResponseBlock />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PromptResponseBlock({ prompt, response }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-sm">Prompt</CardTitle><Badge variant="outline">User</Badge></CardHeader>
        <CardContent><ScrollArea className="h-[120px]"><p className="text-sm whitespace-pre-wrap">{prompt}</p></ScrollArea></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Response</CardTitle><Badge variant="secondary">Model</Badge></CardHeader>
        <CardContent><ScrollArea className="h-[120px]"><p className="text-sm whitespace-pre-wrap">{response}</p></ScrollArea></CardContent>
      </Card>
    </div>
  )
}
`,
  },
  "token-usage-summary": {
    slug: "token-usage-summary",
    name: "Token Usage Summary",
    description: "Card showing prompt/completion/total tokens and estimated cost.",
    type: "block",
    category: "LLM/NLP",
    component: <TokenUsageSummary />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TokenUsageSummary({ promptTokens, completionTokens, totalTokens, estimatedCost }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Token usage</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted-foreground">Prompt</span><p className="font-medium">{promptTokens}</p></div>
          <div><span className="text-muted-foreground">Completion</span><p className="font-medium">{completionTokens}</p></div>
          <div><span className="text-muted-foreground">Total</span><p className="font-medium">{totalTokens}</p></div>
          <div><span className="text-muted-foreground">Est. cost</span><p className="font-medium">\${estimatedCost}</p></div>
        </div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "image-prediction-card": {
    slug: "image-prediction-card",
    name: "Image Prediction Card",
    description: "Image upload/preview area with detections list (labels and confidence).",
    type: "block",
    category: "Computer Vision",
    component: <ImagePredictionCard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

export function ImagePredictionCard({ predictions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image prediction</CardTitle>
        <Button size="sm" variant="outline">Upload</Button>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <ul className="space-y-1 mt-2">
          {predictions?.map((p, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{p.label}</span>
              <Badge variant="secondary">{(p.confidence * 100).toFixed(0)}%</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
`,
  },
  "metric-diff-block": {
    slug: "metric-diff-block",
    name: "Metric Diff Block",
    description: "Before/after metric comparison with delta (e.g. accuracy, F1, loss).",
    type: "block",
    category: "Utilities",
    component: <MetricDiffBlock />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricDiffBlock({ diffs }) {
  return (
    <Card>
      <CardHeader><CardTitle>Metric diff (before → after)</CardTitle></CardHeader>
      <CardContent>
        {diffs.map((row) => (
          <div key={row.metric} className="flex justify-between text-sm py-2 border-b">
            <span>{row.metric}</span>
            <span>{row.before} → {row.after} ({row.delta > 0 ? "+" : ""}{(row.delta * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
`,
  },
  "status-pill-row": {
    slug: "status-pill-row",
    name: "Status Pill Row",
    description: "Row of status pills (running, failed, success, pending).",
    type: "block",
    category: "Utilities",
    component: <StatusPillRow />,
    code: `import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatusPillRow({ items }) {
  return (
    <Card>
      <CardHeader><CardTitle>Pipeline steps</CardTitle></CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge key={item.id} variant={item.status === "success" ? "default" : item.status === "failed" ? "destructive" : "secondary"}>
              {item.label}: {item.status}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "run-report-summary-card": {
    slug: "run-report-summary-card",
    name: "Run Report Summary Card",
    description: "Run metrics summary with Export and Share actions.",
    type: "block",
    category: "Reporting",
    component: <RunReportSummaryCard />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Download } from "lucide-react"

export function RunReportSummaryCard({ runId, accuracy, f1, duration }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Run report</CardTitle>
        <Badge variant="secondary">Summary</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-mono">{runId}</p>
        <div>Accuracy: {(accuracy * 100).toFixed(1)}%</div>
        <div>F1: {f1.toFixed(3)}</div>
        <div>Duration: {duration}</div>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button size="sm" variant="outline"><Share2 className="h-4 w-4 mr-1" />Share</Button>
        </div>
      </CardContent>
    </Card>
  )
}
`,
  },
  "pipeline-status-timeline": {
    slug: "pipeline-status-timeline",
    name: "Pipeline Status Timeline",
    description: "Timeline of pipeline steps with completed/running/pending status.",
    type: "block",
    category: "Status",
    component: <PipelineStatusTimeline />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Circle, Loader2 } from "lucide-react"

export function PipelineStatusTimeline({ steps }) {
  return (
    <Card>
      <CardHeader><CardTitle>Pipeline status</CardTitle></CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center gap-3">
              {step.status === "completed" ? <Check className="h-4 w-4 text-primary" /> : step.status === "running" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Circle className="h-2 w-2" />}
              <span className="text-sm font-medium">{step.label}</span>
              <Badge variant="secondary">{step.duration}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
`,
  },
  "health-check-summary": {
    slug: "health-check-summary",
    name: "Health Check Summary",
    description: "List of services with health status and optional latency.",
    type: "block",
    category: "Status",
    component: <HealthCheckSummary />,
    code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HealthCheckSummary({ services }) {
  return (
    <Card>
      <CardHeader><CardTitle>Health check</CardTitle></CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {services.map((svc) => (
            <li key={svc.name} className="flex justify-between rounded-lg border px-3 py-2 text-sm">
              <span className="font-medium">{svc.name}</span>
              <Badge variant={svc.status === "healthy" ? "default" : "destructive"}>{svc.status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
`,
  },
};
