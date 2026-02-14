"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockRun = {
  runId: "run-abc123",
  dataset: "sentiment-train-v2",
  duration: "2h 14m",
  epochs: 10,
  batchSize: 32,
  lr: 0.001,
  optimizer: "AdamW",
  status: "Completed",
};

export function TrainingRunConfigCard() {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Run config</CardTitle>
        <Badge className="bg-green-500/90 border-0">{mockRun.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Run ID</span>
          <p className="font-mono text-xs font-medium truncate" title={mockRun.runId}>
            {mockRun.runId}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Dataset</span>
            <p className="font-medium">{mockRun.dataset}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Duration</span>
            <p className="font-medium">{mockRun.duration}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Epochs</span>
            <p className="font-medium">{mockRun.epochs}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Batch size</span>
            <p className="font-medium">{mockRun.batchSize}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Learning rate</span>
            <p className="font-medium">{mockRun.lr}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Optimizer</span>
            <p className="font-medium">{mockRun.optimizer}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
