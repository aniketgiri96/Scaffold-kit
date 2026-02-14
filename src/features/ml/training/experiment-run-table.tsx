"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockRuns = [
  { runId: "run-abc123", status: "Completed", accuracy: 0.902, loss: 0.24, duration: "2h 14m" },
  { runId: "run-def456", status: "Running", accuracy: null, loss: null, duration: "1h 05m" },
  { runId: "run-ghi789", status: "Failed", accuracy: null, loss: null, duration: "0h 12m" },
];

export function ExperimentRunTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Experiment runs</CardTitle>
        <Button size="sm">New run</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Run ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Loss</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="w-[80px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRuns.map((row) => (
              <TableRow key={row.runId}>
                <TableCell className="font-mono text-xs">{row.runId}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Completed"
                        ? "default"
                        : row.status === "Failed"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {row.accuracy != null ? `${(row.accuracy * 100).toFixed(1)}%` : "—"}
                </TableCell>
                <TableCell>{row.loss != null ? row.loss.toFixed(3) : "—"}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" className="h-8 px-2">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
