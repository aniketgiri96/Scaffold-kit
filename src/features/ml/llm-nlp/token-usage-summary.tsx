"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockUsage = {
  promptTokens: 120,
  completionTokens: 85,
  totalTokens: 205,
  estimatedCost: "0.0023",
};

export function TokenUsageSummary() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-base">Token usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Prompt</span>
            <p className="font-medium">{mockUsage.promptTokens}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Completion</span>
            <p className="font-medium">{mockUsage.completionTokens}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total</span>
            <p className="font-medium">{mockUsage.totalTokens}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Est. cost</span>
            <p className="font-medium">${mockUsage.estimatedCost}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
