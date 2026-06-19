// Shared theming + formatters for the survey charts.
// Colour mapping is fixed everywhere: coral = AI, teal = human.

export const COLOR = {
  ai: "#C2664A",
  human: "#3E7C77",
  grid: "rgba(136,135,128,0.18)",
  zeroLine: "#888",
} as const;

export const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,.1)",
} as const;

// Format a value as "+0.00" / "−0.00" (true minus sign), 2 dp. Empty for null/NaN.
// Accepts `unknown` so it satisfies Recharts' Tooltip/LabelList formatter types.
export function formatSigned(v: unknown): string {
  if (v == null || v === "") return "";
  const n = Number(v);
  if (Number.isNaN(n)) return "";
  const r = Math.round(n * 100) / 100;
  return (r >= 0 ? "+" : "−") + Math.abs(r).toFixed(2);
}

// Plain 2 dp, empty for null/NaN.
export function formatScore(v: unknown): string {
  if (v == null || v === "") return "";
  const n = Number(v);
  if (Number.isNaN(n)) return "";
  return n.toFixed(2);
}

// Symmetric y-domain for diverging charts, computed from the data so the chart
// reads correctly whether values are positive or negative. Padded 15%.
export function symmetricDomain(
  values: Array<number | null | undefined>,
): [number, number] {
  const magnitudes = values
    .filter((v): v is number => v != null && !Number.isNaN(v))
    .map(Math.abs);
  const m = Math.max(0.1, ...magnitudes);
  return [-m * 1.15, m * 1.15];
}
