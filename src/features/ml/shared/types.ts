/**
 * Shared TypeScript types for ML blocks. Use these when wiring real API data.
 * Components accept optional props with these shapes; when omitted, demo defaults are used.
 */

/** Single point on accuracy-over-epochs chart (train/val). */
export interface AccuracyEpochPoint {
  epoch: number;
  train: number;
  val: number;
}

/** Metrics summary for ML Model Performance Dashboard. */
export interface MLModelPerformanceMetrics {
  accuracy: string;
  f1: string;
  loss: string;
  status: string;
  version: string;
}

export interface MLModelPerformanceDashboardProps {
  metrics?: MLModelPerformanceMetrics;
  accuracyCurve?: AccuracyEpochPoint[];
}

/** Single resource row for Resource Usage Dashboard. */
export interface ResourceUsageItem {
  name: string;
  usage: number;
  label: string;
  status?: "active" | "warning" | "error";
}

export interface ClusterSummary {
  totalGpuMemory: string;
  activeJobs: number;
  queue: number;
}

export interface ResourceUsageDashboardProps {
  resources?: ResourceUsageItem[];
  clusterSummary?: ClusterSummary;
}

/** Single point for training loss/accuracy dual-axis chart. */
export interface LossAccuracyPoint {
  step: number;
  loss: number;
  accuracy: number;
}

/** Single point for ROC curve (FPR, TPR). */
export interface RocPoint {
  fpr: number;
  tpr: number;
}

/** Model card metadata. */
export interface ModelCardProps {
  name: string;
  version: string;
  framework: string;
  size: string;
  lastUpdated: string;
  status: string;
}
