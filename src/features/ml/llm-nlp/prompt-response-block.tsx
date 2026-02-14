"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockPrompt = "Summarize the key risks in this contract in 3 bullet points.";
const mockResponse =
  "• **Liability cap**: Limited to 2x annual fees.\n• **Data processing**: Subprocessor list may change with 30 days notice.\n• **Termination**: 90 days notice required; data return within 30 days.";

export function PromptResponseBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            Prompt
            <Badge variant="outline" className="text-xs font-normal">
              User
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px] w-full rounded-md border border-border p-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">{mockPrompt}</p>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            Response
            <Badge variant="secondary" className="text-xs font-normal">
              Model
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px] w-full rounded-md border border-border p-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">{mockResponse}</p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
