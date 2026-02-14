"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockModel = {
  name: "bert-classifier-v1",
  version: "1.2.0",
  framework: "PyTorch",
  size: "440 MB",
  lastUpdated: "2024-01-15",
  status: "Ready",
};

export function ModelCard() {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{mockModel.name}</CardTitle>
        <Badge className="bg-green-500/90 border-0">{mockModel.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Version</span>
            <p className="font-medium">{mockModel.version}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Framework</span>
            <p className="font-medium">{mockModel.framework}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Size</span>
            <p className="font-medium">{mockModel.size}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Last updated</span>
            <p className="font-medium">{mockModel.lastUpdated}</p>
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
