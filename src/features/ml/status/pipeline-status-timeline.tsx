"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Circle, Loader2 } from "lucide-react";

const mockSteps = [
  { id: "1", label: "Data load", status: "completed", duration: "0m 12s" },
  { id: "2", label: "Training", status: "running", duration: "—" },
  { id: "3", label: "Validation", status: "pending", duration: "—" },
  { id: "4", label: "Export model", status: "pending", duration: "—" },
];

export function PipelineStatusTimeline() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-base">Pipeline status</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {mockSteps.map((step, i) => (
            <li key={step.id} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                {step.status === "completed" ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : step.status === "running" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                ) : (
                  <Circle className="h-2 w-2 text-muted-foreground" />
                )}
              </span>
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-medium">{step.label}</span>
                <Badge
                  variant={
                    step.status === "completed"
                      ? "default"
                      : step.status === "running"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-xs"
                >
                  {step.duration}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
