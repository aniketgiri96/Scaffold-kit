"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockDataset = {
  name: "sentiment-train-v2",
  size: "2.4 GB",
  trainSamples: 80000,
  valSamples: 10000,
  testSamples: 10000,
  lastUpdated: "2024-01-12",
};

export function DatasetCard() {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{mockDataset.name}</CardTitle>
        <Badge variant="secondary">{mockDataset.size}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Train</span>
            <p className="font-medium">{mockDataset.trainSamples.toLocaleString()} samples</p>
          </div>
          <div>
            <span className="text-muted-foreground">Validation</span>
            <p className="font-medium">{mockDataset.valSamples.toLocaleString()} samples</p>
          </div>
          <div>
            <span className="text-muted-foreground">Test</span>
            <p className="font-medium">{mockDataset.testSamples.toLocaleString()} samples</p>
          </div>
          <div>
            <span className="text-muted-foreground">Last updated</span>
            <p className="font-medium">{mockDataset.lastUpdated}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Preview</Button>
          <Button size="sm" variant="outline">
            View schema
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
