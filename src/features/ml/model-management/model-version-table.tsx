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

const mockVersions = [
  { version: "1.2.0", accuracy: 0.902, f1: 0.891, status: "Deployed", createdAt: "2024-01-15" },
  { version: "1.1.0", accuracy: 0.887, f1: 0.875, status: "Archived", createdAt: "2024-01-10" },
  { version: "1.0.0", accuracy: 0.854, f1: 0.842, status: "Archived", createdAt: "2024-01-05" },
];

export function ModelVersionTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Model versions</CardTitle>
        <Button size="sm">Register version</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>F1</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVersions.map((row) => (
              <TableRow key={row.version}>
                <TableCell className="font-medium">{row.version}</TableCell>
                <TableCell>{(row.accuracy * 100).toFixed(1)}%</TableCell>
                <TableCell>{row.f1.toFixed(3)}</TableCell>
                <TableCell>
                  <Badge variant={row.status === "Deployed" ? "default" : "secondary"}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.createdAt}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" className="h-8 px-2">
                    Deploy
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
