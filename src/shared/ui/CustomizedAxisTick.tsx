interface CustomizedAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

export function CustomizedAxisTick({
  x = 0,
  y = 0,
  payload,
}: CustomizedAxisTickProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="end"
        fill="#6b7280"
        fontSize={12}
        transform="rotate(-35)"
      >
        {payload?.value}
      </text>
    </g>
  );
}
