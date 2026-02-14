"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockDistribution = [
  { label: "Class A", count: 3200 },
  { label: "Class B", count: 2800 },
  { label: "Class C", count: 2100 },
  { label: "Class D", count: 1900 },
];

export function LabelDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Label distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDistribution} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => [value.toLocaleString(), "Count"]} />
              <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
