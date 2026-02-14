"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

const mockPredictions = [
  { label: "cat", confidence: 0.96, bbox: [120, 80, 200, 180] },
  { label: "couch", confidence: 0.88, bbox: [10, 150, 280, 220] },
];

export function ImagePredictionCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Image prediction</CardTitle>
        <Button size="sm" variant="outline">
          Upload
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full rounded-lg border border-border bg-muted flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Detections</p>
          <ul className="space-y-1">
            {mockPredictions.map((p, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="font-medium">{p.label}</span>
                <Badge variant="secondary">{(p.confidence * 100).toFixed(0)}%</Badge>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground font-mono pt-1">
            bbox: [x, y, w, h]
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
