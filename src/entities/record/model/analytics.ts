// Pure, store-independent transforms for the survey charts.
// Kept separate from `selectors.ts` so they can be unit-tested without Redux.

import type { Submission, ArtRating, CreatorType, Metric } from "./types";

// --- Likert scoring ---
// Case-insensitive; some cells contain "Neutral;Agree" — take the first token.
const LIKERT: Record<string, number> = {
  "strongly disagree": 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  "strongly agree": 5,
};

export function toScore(v: string | null | undefined): number | null {
  if (v == null) return null;
  const key = String(v).split(";")[0].trim().toLowerCase();
  return LIKERT[key] ?? null;
}

export function mean(values: Array<number | null | undefined>): number | null {
  const xs = values.filter((v): v is number => v != null && !Number.isNaN(v));
  return xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : null;
}

export function round2(x: number | null): number | null {
  return x == null ? null : Math.round(x * 100) / 100;
}

// The three survey statements, in display order. Keys match `RatingScores`.
export const METRICS: readonly Metric[] = ["like", "pay", "profound"] as const;

export const STATEMENT_LABELS: Record<Metric, string> = {
  like: "I like this artwork",
  pay: "Willing to pay for it",
  profound: "This work is profound",
};

// --- Output types ---

export interface CreatorStatementDatum {
  statement: string;
  AI: number | null;
  Human: number | null;
}

export interface AiChangeByAgeDatum {
  age: string;
  change: number | null;
  n: number;
}

// --- Helpers ---

function collectRatings(
  submissions: Submission[],
  creatorType: CreatorType,
): ArtRating[] {
  return submissions.flatMap((s) =>
    s.data?.art_ratings
      ? s.data.art_ratings.filter((r) => r.creator_type === creatorType)
      : [],
  );
}

// mean(revealed) − mean(hidden), pooling every respondent × image cell in the group.
function changeByCreatorMetric(
  submissions: Submission[],
  creatorType: CreatorType,
  metric: Metric,
): number | null {
  const ratings = collectRatings(submissions, creatorType);
  const hidden = mean(ratings.map((r) => toScore(r.hidden[metric])));
  const revealed = mean(ratings.map((r) => toScore(r.revealed[metric])));
  return hidden == null || revealed == null ? null : revealed - hidden;
}

function hiddenMeanByCreatorMetric(
  submissions: Submission[],
  creatorType: CreatorType,
  metric: Metric,
): number | null {
  const ratings = collectRatings(submissions, creatorType);
  return mean(ratings.map((r) => toScore(r.hidden[metric])));
}

// --- Chart 1: average change per statement, AI vs human ---
export function computeOpinionChange(
  submissions: Submission[],
): CreatorStatementDatum[] {
  return METRICS.map((metric) => ({
    statement: STATEMENT_LABELS[metric],
    AI: round2(changeByCreatorMetric(submissions, "ai", metric)),
    Human: round2(changeByCreatorMetric(submissions, "human", metric)),
  }));
}

// --- Chart 2: average hidden (pre-reveal) score per statement, AI vs human ---
export function computeFirstImpression(
  submissions: Submission[],
): CreatorStatementDatum[] {
  return METRICS.map((metric) => ({
    statement: STATEMENT_LABELS[metric],
    AI: round2(hiddenMeanByCreatorMetric(submissions, "ai", metric)),
    Human: round2(hiddenMeanByCreatorMetric(submissions, "human", metric)),
  }));
}

// --- Chart 3: per-respondent mean change on AI art, averaged within age bands ---

// The age demographic key is a dynamic field; detect it at runtime.
export function detectAgeKey(submissions: Submission[]): string | null {
  for (const s of submissions) {
    const demographics = s.data?.demographics;
    if (!demographics) continue;
    const key = Object.keys(demographics).find((k) => /age/i.test(k));
    if (key) return key;
  }
  return null;
}

// Mean (revealed − hidden) across this respondent's AI images × all three statements.
function respondentAiChange(submission: Submission): number | null {
  const aiRatings =
    submission.data?.art_ratings?.filter((r) => r.creator_type === "ai") ?? [];
  const deltas: number[] = [];
  for (const rating of aiRatings) {
    for (const metric of METRICS) {
      const hidden = toScore(rating.hidden[metric]);
      const revealed = toScore(rating.revealed[metric]);
      if (hidden != null && revealed != null) deltas.push(revealed - hidden);
    }
  }
  return deltas.length ? deltas.reduce((s, v) => s + v, 0) / deltas.length : null;
}

// Sort key for ordering bands youngest → oldest from arbitrary labels
// ("Under 18", "18-24", …, "65+"). Falls back to end-of-list when no number.
export function ageSortValue(label: string): number {
  const lower = label.toLowerCase();
  if (/under|below|<|younger/.test(lower)) return -1;
  const match = label.match(/\d+/);
  return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
}

export function computeAiChangeByAge(
  submissions: Submission[],
): AiChangeByAgeDatum[] {
  const ageKey = detectAgeKey(submissions);
  if (!ageKey) return [];

  const groups = new Map<string, number[]>();
  for (const submission of submissions) {
    const age = submission.data?.demographics?.[ageKey];
    if (!age) continue;
    const value = respondentAiChange(submission);
    if (value == null) continue;
    if (!groups.has(age)) groups.set(age, []);
    groups.get(age)!.push(value);
  }

  return [...groups.entries()]
    .map(([age, values]) => ({
      age,
      change: round2(mean(values)),
      n: values.length,
    }))
    .sort((a, b) => ageSortValue(a.age) - ageSortValue(b.age));
}
