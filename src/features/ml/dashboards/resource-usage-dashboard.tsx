"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockResources = [
  { name: "GPU 0", usage: 78, label: "GPU", status: "active" },
  { name: "GPU 1", usage: 45, label: "GPU", status: "active" },
  { name: "CPU", usage: 62, label: "CPU", status: "active" },
  { name: "Memory", usage: 84, label: "RAM", status: "warning" },
];

export function ResourceUsageDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockResources.map((r) => (
        <Card key={r.name}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{r.name}</CardTitle>
            <Badge
              variant={r.usage > 80 ? "destructive" : "secondary"}
              className="text-xs"
            >
              {r.usage}%
            </Badge>
          </CardHeader>
          <CardContent>
            <Progress value={r.usage} className="h-2" />
            <p className="mt-1 text-xs text-muted-foreground">{r.label} utilization</p>
          </CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Cluster summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Total GPU memory:</span>{" "}
              <span className="font-medium">32 GB</span>
            </div>
            <div>
              <span className="text-muted-foreground">Active jobs:</span>{" "}
              <span className="font-medium">3</span>
            </div>
            <div>
              <span className="text-muted-foreground">Queue:</span>{" "}
              <span className="font-medium">2</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
