"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockBatch = {
  total: 1000,
  done: 640,
  failed: 12,
  jobId: "batch-xyz789",
  status: "Running",
};

export function BatchInferenceProgress() {
  const success = mockBatch.done - mockBatch.failed;
  const progressPct = mockBatch.total > 0 ? (mockBatch.done / mockBatch.total) * 100 : 0;

  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Batch inference</CardTitle>
        <Badge variant="secondary">{mockBatch.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-mono text-muted-foreground">{mockBatch.jobId}</p>
        <Progress value={progressPct} className="h-2" />
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-muted-foreground">
            Done: <span className="font-medium text-foreground">{mockBatch.done}</span>
          </span>
          <span className="text-muted-foreground">
            Success: <span className="font-medium text-foreground">{success}</span>
          </span>
          <span className="text-muted-foreground">
            Failed: <span className="font-medium text-destructive">{mockBatch.failed}</span>
          </span>
          <span className="text-muted-foreground">
            Total: <span className="font-medium text-foreground">{mockBatch.total}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
