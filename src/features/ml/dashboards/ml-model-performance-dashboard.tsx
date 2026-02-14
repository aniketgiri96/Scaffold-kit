"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_STROKE } from "@/features/ml/shared/chart-theme";

const mockAccuracy = [
  { epoch: 1, train: 0.45, val: 0.42 },
  { epoch: 2, train: 0.62, val: 0.58 },
  { epoch: 3, train: 0.74, val: 0.71 },
  { epoch: 4, train: 0.82, val: 0.78 },
  { epoch: 5, train: 0.88, val: 0.84 },
  { epoch: 6, train: 0.92, val: 0.87 },
  { epoch: 7, train: 0.95, val: 0.89 },
  { epoch: 8, train: 0.97, val: 0.90 },
];

export function MLModelPerformanceDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Accuracy
          </CardTitle>
          <Badge variant="secondary">Last epoch</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">90.2%</div>
          <p className="text-xs text-muted-foreground">Validation</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            F1 Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0.891</div>
          <p className="text-xs text-muted-foreground">Macro avg</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Loss
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0.24</div>
          <p className="text-xs text-muted-foreground">Cross-entropy</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Status
          </CardTitle>
          <Badge className="bg-green-500/90 border-0">Ready</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Deployed</div>
          <p className="text-xs text-muted-foreground">v1.2.0</p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Accuracy over epochs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAccuracy} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="epoch" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="train"
                  name="Train"
                  stroke={CHART_STROKE.primary}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="val"
                  name="Validation"
                  stroke={CHART_STROKE.secondary}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
