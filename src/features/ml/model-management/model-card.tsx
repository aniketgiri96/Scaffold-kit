"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ModelCardProps } from "@/features/ml/shared/types";

const DEFAULT_MODEL: ModelCardProps = {
  name: "bert-classifier-v1",
  version: "1.2.0",
  framework: "PyTorch",
  size: "440 MB",
  lastUpdated: "2024-01-15",
  status: "Ready",
};

export function ModelCard({
  name = DEFAULT_MODEL.name,
  version = DEFAULT_MODEL.version,
  framework = DEFAULT_MODEL.framework,
  size = DEFAULT_MODEL.size,
  lastUpdated = DEFAULT_MODEL.lastUpdated,
  status = DEFAULT_MODEL.status,
}: Partial<ModelCardProps> = {}) {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <Badge className="bg-green-500/90 border-0">{status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Version</span>
            <p className="font-medium">{version}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Framework</span>
            <p className="font-medium">{framework}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Size</span>
            <p className="font-medium">{size}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Last updated</span>
            <p className="font-medium">{lastUpdated}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Deploy</Button>
          <Button size="sm" variant="outline">
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
