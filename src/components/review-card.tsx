import React from "react";
import { format as timeAgo } from "timeago.js";
import {
  Review,
  ThemeIcon,
  ThemeLabel,
  ThemeLabelsContainer,
} from "./kit/review";
import { Text } from "./kit/text";
import { FeedbackItem, ReviewTheme, Sentiment } from "../typings/feed";

export const ReviewCard: React.FC<FeedbackItem> = ({
  comment,
  created_at,
  themes,
}) => {
  const created = timeAgo(created_at);
  return (
    <Review>
      <Text>{comment}</Text>
      <ThemeLabelsContainer>
        {themes.map((theme: ReviewTheme) => (
          <ThemeLabel
            negative={theme.sentiment === Sentiment.NEGATIVE}
            key={theme.theme_id}
          >
            {theme.sentiment !== Sentiment.NEUTRAL && (
              <ThemeIcon sentiment={theme.sentiment} />
            )}
            <Text fz={12} lh={16} color="#8e899d">
              {theme.title}
            </Text>
          </ThemeLabel>
        ))}
      </ThemeLabelsContainer>
      <Text fz={12} lh={16} color="#8e899d">
        {created}
      </Text>
    </Review>
  );
};
