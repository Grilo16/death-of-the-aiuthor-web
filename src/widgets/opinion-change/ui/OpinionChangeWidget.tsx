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
  LabelList,
} from "recharts";
import { Card, CardBody } from "reactstrap";
import { useAppSelector } from "@/app/store/hooks";
import { selectOpinionChange } from "@/entities/record";
import {
  COLOR,
  TOOLTIP_STYLE,
  formatSigned,
  symmetricDomain,
} from "@/shared/ui";

export function OpinionChangeWidget() {
  const data = useAppSelector(selectOpinionChange);
  const domain = symmetricDomain(data.flatMap((d) => [d.AI, d.Human]));

  return (
    <Card className="d-flex flex-column w-100">
      <CardBody>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data} barCategoryGap="25%" margin={{ top: 24 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={COLOR.grid}
            />
            <XAxis
              dataKey="statement"
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={domain}
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => v.toFixed(2)}
              label={{
                value: "average change in rating",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#6b7280", textAnchor: "middle" },
              }}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={formatSigned} />
            <Legend verticalAlign="top" iconType="circle" iconSize={10} />
            <ReferenceLine y={0} stroke={COLOR.zeroLine} />
            <Bar dataKey="AI" name="AI" fill={COLOR.ai} radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="AI"
                position="top"
                formatter={formatSigned}
                style={{ fontSize: 11, fill: COLOR.ai }}
              />
            </Bar>
            <Bar
              dataKey="Human"
              name="Human"
              fill={COLOR.human}
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="Human"
                position="top"
                formatter={formatSigned}
                style={{ fontSize: 11, fill: COLOR.human }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
