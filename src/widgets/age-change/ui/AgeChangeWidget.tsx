import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  LabelList,
} from "recharts";
import { Card, CardBody } from "reactstrap";
import { useAppSelector } from "@/app/store/hooks";
import { selectAiChangeByAge } from "@/entities/record";
import {
  COLOR,
  TOOLTIP_STYLE,
  formatSigned,
  symmetricDomain,
} from "@/shared/ui";

const MIN_BAND_N = 3;

export function AgeChangeWidget() {
  const data = useAppSelector(selectAiChangeByAge);

  // Hide noisy bands (n < 3); fall back to showing everything if that would
  // leave nothing (e.g. early on with few responses), and footnote the caveat.
  const reliable = data.filter((d) => d.n >= MIN_BAND_N);
  const showingAll = reliable.length === 0;
  const display = showingAll ? data : reliable;
  const lowN = data.filter((d) => d.n < MIN_BAND_N);
  const domain = symmetricDomain(display.map((d) => d.change));

  if (data.length === 0) {
    return (
      <Card className="d-flex flex-column w-100">
        <CardBody className="text-center text-muted py-5">
          No age data available yet.
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="d-flex flex-column w-100">
      <CardBody>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={display} barCategoryGap="25%" margin={{ top: 24 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={COLOR.grid}
            />
            <XAxis
              dataKey="age"
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
                value: "change in rating (AI art)",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#6b7280", textAnchor: "middle" },
              }}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={formatSigned} />
            <ReferenceLine y={0} stroke={COLOR.zeroLine} />
            <Bar
              dataKey="change"
              name="Change"
              fill={COLOR.ai}
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="change"
                position="top"
                formatter={formatSigned}
                style={{ fontSize: 11, fill: COLOR.ai }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {showingAll && lowN.length > 0 && (
          <p className="text-muted small mb-0 mt-2 fst-italic">
            Some age groups have fewer than {MIN_BAND_N} responses — read with
            caution.
          </p>
        )}
        {!showingAll && lowN.length > 0 && (
          <p className="text-muted small mb-0 mt-2 fst-italic">
            Hidden ({lowN.length} age group{lowN.length !== 1 && "s"} with fewer
            than {MIN_BAND_N} responses): {lowN.map((d) => d.age).join(", ")}.
          </p>
        )}
      </CardBody>
    </Card>
  );
}
