import { AxiosResponse } from "axios";

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
  title?: string;
}

export type ReviewThemes = Array<ReviewTheme>;

export interface FeedbackItem {
  id: string | number;
  comment: string;
  themes: ReviewThemes;
  created_at: string;
}

export type AllThemesResponse = Array<AxiosResponse<{ data: Theme[] }>>;

export type ThemesFilterOptions = Array<{ value: number; label: string }>;
