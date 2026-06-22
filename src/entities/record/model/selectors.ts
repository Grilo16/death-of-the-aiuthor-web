import { createSelector } from "@reduxjs/toolkit";
import { recordApi } from "../api/recordApi";
import type { Submission } from "./types";
import {
  computeOpinionChange,
  computeFirstImpression,
  computeAiChangeByAge,
  collectFeedbackComments,
} from "./analytics";

// --- Base Selector ---

const selectRecordsResult = recordApi.endpoints.getRecords.select();

export const selectAllSubmissions = createSelector(
  selectRecordsResult,
  (result): Submission[] => result.data ?? [],
);

// --- Survey chart selectors (see ./analytics for the pure transforms) ---

// Chart 1 — average change in rating per statement, AI vs human.
export const selectOpinionChange = createSelector(
  selectAllSubmissions,
  computeOpinionChange,
);

// Chart 2 — average pre-reveal ("hidden") score per statement, AI vs human.
export const selectFirstImpression = createSelector(
  selectAllSubmissions,
  computeFirstImpression,
);

// Chart 3 — per-respondent mean change on AI art, averaged within age bands.
export const selectAiChangeByAge = createSelector(
  selectAllSubmissions,
  computeAiChangeByAge,
);

// Free-text feedback comments left by respondents.
export const selectFeedbackComments = createSelector(
  selectAllSubmissions,
  collectFeedbackComments,
);
