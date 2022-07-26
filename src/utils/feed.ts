import { FeedbackItem, ThemeFilter } from "../typings/feed";

export const filterReviews = (
  reviews: FeedbackItem[],
  filter: ThemeFilter | null,
) => {
  if (!filter) {
    return reviews;
  }
  const filtered = reviews.filter((review) => {
    const themeIDs = review.themes.map((theme) => theme.theme_id);
    return themeIDs.includes(filter.value);
  });
  return filtered;
};

export const filterEnabledOptions = (reviews: FeedbackItem[]): number[] => {
  const unique = new Set<number>();
  reviews.forEach((review) => {
    const ids = review.themes.map((theme) => theme.theme_id);
    for (let id of ids) {
      if (!unique.has(id)) {
        unique.add(id);
      }
    }
  });
  return Array.from(unique);
};
