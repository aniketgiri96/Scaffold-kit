"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockServices = [
  { name: "Model server", status: "healthy", latency: "12 ms" },
  { name: "Data store", status: "healthy", latency: "5 ms" },
  { name: "Queue", status: "degraded", latency: "—" },
];

export function HealthCheckSummary() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-base">Health check</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockServices.map((svc) => (
            <li
              key={svc.name}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
            >
              <span className="font-medium">{svc.name}</span>
              <div className="flex items-center gap-2">
                {svc.latency !== "—" && (
                  <span className="text-muted-foreground text-xs">{svc.latency}</span>
                )}
                <Badge
                  variant={
                    svc.status === "healthy"
                      ? "default"
                      : svc.status === "degraded"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {svc.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
