// --- Domain Types ---

export type CreatorType = "ai" | "human";
export type Metric = "pay" | "like" | "profound";

export type LikertLabel =
  | "Strongly Disagree"
  | "Disagree"
  | "Neutral"
  | "Agree"
  | "Strongly Agree";

export interface RatingScores {
  pay: string;
  like: string;
  profound: string;
}

export interface ArtRating {
  image_id: string;
  creator_type: CreatorType;
  hidden: RatingScores;
  revealed: RatingScores;
}

export interface Demographics {
  studied_art: string;
  [key: string]: string;
}

export interface SubmissionData {
  demographics: Demographics;
  art_ratings: ArtRating[];
}

export interface Submission {
  id: number;
  created_at: string;
  data: SubmissionData;
}

// --- Chart Output Types ---

export interface LikertDistributionDatum {
  name: string;
  hidden: number;
  revealed: number;
}

export interface AverageDeltaDatum {
  name: string;
  delta: number;
}
