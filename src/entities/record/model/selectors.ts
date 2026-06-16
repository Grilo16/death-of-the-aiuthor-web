import { createSelector } from "@reduxjs/toolkit";
import { recordApi } from "../api/recordApi";
import type {
  Submission,
  CreatorType,
  Metric,
  ArtRating,
  LikertLabel,
  LikertDistributionDatum,
  AverageDeltaDatum,
} from "./types";

// --- Constants ---

const LIKERT_LABELS: readonly LikertLabel[] = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
] as const;

const LIKERT_TO_NUMERIC: Record<string, number> = {
  "Strongly Disagree": 1,
  Disagree: 2,
  Neutral: 3,
  Agree: 4,
  "Strongly Agree": 5,
};

// --- Internal Helpers ---

function collectRatings(
  submissions: Submission[],
  creatorType: CreatorType,
): ArtRating[] {
  return submissions.flatMap((s) =>
    s.data?.art_ratings ?
    s.data.art_ratings.filter((r) => r.creator_type === creatorType) : [],
  );
}

function tabulateLikert(
  ratings: ArtRating[],
  metric: Metric,
): LikertDistributionDatum[] {
  const hidden = new Map<string, number>(
    LIKERT_LABELS.map((l) => [l, 0]),
  );
  const revealed = new Map<string, number>(
    LIKERT_LABELS.map((l) => [l, 0]),
  );

  for (const rating of ratings) {
    const h = rating.hidden[metric];
    const r = rating.revealed[metric];
    if (hidden.has(h)) hidden.set(h, hidden.get(h)! + 1);
    if (revealed.has(r)) revealed.set(r, revealed.get(r)! + 1);
  }

  return LIKERT_LABELS.map((label) => ({
    name: label,
    hidden: hidden.get(label)!,
    revealed: revealed.get(label)!,
  }));
}

function averageDelta(ratings: ArtRating[], metric: Metric): number {
  if (ratings.length === 0) return 0;

  let sum = 0;
  for (const r of ratings) {
    sum +=
      (LIKERT_TO_NUMERIC[r.revealed[metric]] ?? 0) -
      (LIKERT_TO_NUMERIC[r.hidden[metric]] ?? 0);
  }
  return sum / ratings.length;
}

// --- Base Selector ---

const selectRecordsResult = recordApi.endpoints.getRecords.select();

export const selectAllSubmissions = createSelector(
  selectRecordsResult,
  (result): Submission[] => result.data ?? [],
);

// --- Parameterized Selectors ---
// Each factory returns a stable `createSelector` instance.
// Consumers must stabilise the reference (e.g. `useMemo`) to preserve memoisation.

export const selectLikertDistribution = (
  creatorType: CreatorType,
  metric: Metric,
) =>
  createSelector(
    selectAllSubmissions,
    (submissions): LikertDistributionDatum[] => {
      const ratings = collectRatings(submissions, creatorType);
      return tabulateLikert(ratings, metric);
    },
  );

export const selectAverageDelta = (metric: Metric) =>
  createSelector(selectAllSubmissions, (submissions): AverageDeltaDatum[] => [
    {
      name: "AI Images",
      delta: averageDelta(collectRatings(submissions, "ai"), metric),
    },
    {
      name: "Human Images",
      delta: averageDelta(collectRatings(submissions, "human"), metric),
    },
  ]);

export const selectDistributionByDemographic = (
  creatorType: CreatorType,
  metric: Metric,
  demographicKey: keyof Submission["data"]["demographics"],
  demographicValue: string,
) =>
  createSelector(
    selectAllSubmissions,
    (submissions): LikertDistributionDatum[] => {
      const filtered = submissions.filter((s) =>
        s.data.demographics?.[demographicKey]?.includes(demographicValue),
      );
      console.log(filtered, demographicValue, demographicKey, submissions)

      return tabulateLikert(collectRatings(filtered, creatorType), metric);
    },
  );
