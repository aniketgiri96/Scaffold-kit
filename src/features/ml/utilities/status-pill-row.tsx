"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockItems = [
  { id: "job-1", label: "Data load", status: "success" },
  { id: "job-2", label: "Training", status: "running" },
  { id: "job-3", label: "Validation", status: "pending" },
  { id: "job-4", label: "Export", status: "failed" },
];

export function StatusPillRow() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-base">Pipeline steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {mockItems.map((item) => (
            <Badge
              key={item.id}
              variant={
                item.status === "success"
                  ? "default"
                  : item.status === "failed"
                    ? "destructive"
                    : item.status === "running"
                      ? "secondary"
                      : "outline"
              }
              className="capitalize"
            >
              {item.label}: {item.status}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
