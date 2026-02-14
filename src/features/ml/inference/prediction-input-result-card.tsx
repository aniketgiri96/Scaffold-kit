"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function PredictionInputResultCard() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="text-base">Try model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Input</label>
          <Input placeholder="Enter text for prediction..." className="font-mono text-sm" />
        </div>
        <Button className="w-full">Predict</Button>
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Result</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Positive (0.92)</Badge>
            <Badge variant="outline">Negative (0.06)</Badge>
            <Badge variant="outline">Neutral (0.02)</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
