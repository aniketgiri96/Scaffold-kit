"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Download } from "lucide-react";

const mockReport = {
  runId: "run-abc123",
  accuracy: 0.902,
  f1: 0.891,
  duration: "2h 14m",
  generatedAt: "2024-01-15 14:32",
};

export function RunReportSummaryCard() {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Run report</CardTitle>
        <Badge variant="secondary">Summary</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-mono text-muted-foreground">{mockReport.runId}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Accuracy</span>
            <p className="font-medium">{(mockReport.accuracy * 100).toFixed(1)}%</p>
          </div>
          <div>
            <span className="text-muted-foreground">F1</span>
            <p className="font-medium">{mockReport.f1.toFixed(3)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Duration</span>
            <p className="font-medium">{mockReport.duration}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Generated</span>
            <p className="font-medium">{mockReport.generatedAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
