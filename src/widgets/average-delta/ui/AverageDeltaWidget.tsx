import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useAppSelector } from "@/app/store/hooks";
import { selectAverageDelta } from "@/entities/record";
import type { Metric } from "@/entities/record";

const METRIC_LABELS: Record<Metric, string> = {
  pay: "Pay",
  like: "Like",
  profound: "Profound",
};

const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,.1)",
} as const;

function DeltaTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.[0]) return null;
  const value = payload[0].value as number;
  return (
    <div style={{ ...TOOLTIP_STYLE, padding: "8px 12px", background: "#fff" }}>
      <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
      <p style={{ margin: 0, color: value >= 0 ? "#10b981" : "#ef4444" }}>
        Δ {value >= 0 ? "+" : ""}
        {value.toFixed(2)}
      </p>
    </div>
  );
}

interface AverageDeltaWidgetProps {
  metric: Metric;
}

export function AverageDeltaWidget({ metric }: AverageDeltaWidgetProps) {
  const selector = useMemo(() => selectAverageDelta(metric), [metric]);
  const data = useAppSelector(selector);

  const title = `Average Rating Shift: '${METRIC_LABELS[metric]}'`;

  return (
    <Card className="d-flex flex-column w-100">
      <CardBody>
        <CardTitle tag="h6" className="text-center mb-3">
          {title}
        </CardTitle>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => v.toFixed(1)}
            />
            <Tooltip content={<DeltaTooltip />} />
            <Legend verticalAlign="top" iconType="circle" iconSize={10} />
            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
            <Bar
              dataKey="delta"
              name="Avg. Δ (Likert Points)"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
