export interface Theme {
  id: number;
  name: string;
}

export enum Sentiment {
  POSITIVE = 1,
  NEUTRAL = 0,
  NEGATIVE = -1,
}

export interface ReviewTheme {
  theme_id: number;
  sentiment: Sentiment;
}

export type ReviewThemes = Array<ReviewTheme>;

export interface FeedbackItem {
  id: string | number;
  comment: string;
  themes: ReviewThemes;
  created_at: string;
}
