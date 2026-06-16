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
} from "recharts";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useAppSelector } from "@/app/store/hooks";
import { selectDistributionByDemographic } from "@/entities/record";
import type { CreatorType, Metric, Demographics } from "@/entities/record";
import { CustomizedAxisTick } from "@/shared/ui/CustomizedAxisTick";

const CREATOR_LABELS: Record<CreatorType, string> = {
  ai: "AI Art",
  human: "Human Art",
};

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

interface DemographicDistributionWidgetProps {
  filterKey: keyof Demographics;
  filterValue: string;
  creatorType: CreatorType;
  metric: Metric;
}

export function DemographicDistributionWidget({
  filterKey,
  filterValue,
  creatorType,
  metric,
}: DemographicDistributionWidgetProps) {
  const selector = useMemo(
    () =>
      selectDistributionByDemographic(
        creatorType,
        metric,
        filterKey,
        filterValue,
      ),
    [creatorType, metric, filterKey, filterValue],
  );
  const data = useAppSelector(selector);

  const prettyFilterKey = String(filterKey)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const title = `${CREATOR_LABELS[creatorType]} — '${METRIC_LABELS[metric]}' Rating (Filtered: ${prettyFilterKey} = ${filterValue})`;
  return (
    <Card className="d-flex flex-column w-100">
      <CardBody>
        <CardTitle tag="h6" className="text-center mb-3">
          {title}
        </CardTitle>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="name"
              tick={<CustomizedAxisTick />}
              height={70}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend verticalAlign="top" iconType="circle" iconSize={10} />
            <Bar
              dataKey="hidden"
              name="Hidden"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="revealed"
              name="Revealed"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
