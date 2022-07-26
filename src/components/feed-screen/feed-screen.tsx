import React, { useEffect, useState } from "react";
import {
  AllThemesResponse,
  ReviewTheme,
  ThemesFilterOptions,
} from "../../typings/feed";
import { getReviews, getAllThemes } from "../../api/feedback-api";
import { useAuth } from "../../services/auth";
import { SecondaryButton } from "../kit/button";
import { Header } from "../kit/header";
import { Logo } from "../kit/logo";
import { StyledSelect } from "../kit/select";
import { FeedScreenRoot } from "./feed-screen.styled";
import { FeedbackItem } from "../../typings/feed";
import { ReviewCard } from "../review-card";
import { mapAllThemesToOptions } from "../../utils/api";

// const feedbackItems: FeedbackItem[] = [
//   {
//     id: "id1",
//     comment: "first feedback item",
//     themes: [
//       { theme_id: 6372, sentiment: 1 },
//       { theme_id: 6352, sentiment: -1 },
//     ],
//     created_at: "2019-07-18T23:10:33Z",
//   },
//   {
//     id: "id2",
//     comment: "second feedback item",
//     themes: [{ theme_id: 6345, sentiment: 0 }],
//     created_at: "2019-07-18T23:10:33Z",
//   },
// ];

export const FeedScreen: React.FC = () => {
  const [themeOptions, setThemeOptions] = useState<ThemesFilterOptions | []>(
    [],
  );
  const [reviews, setReviews] = useState<FeedbackItem[] | null>(null);
  const auth = useAuth();

  const onLogOut = () => {
    auth?.signOut();
  };

  useEffect(() => {
    Promise.all([getAllThemes(), getReviews()])
      .then(([themes, reviews]) => {
        const themesData = mapAllThemesToOptions(themes as AllThemesResponse);
        const reviewsData = reviews.data.data;
        setThemeOptions(themesData);
        setReviews(reviewsData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FeedScreenRoot>
      <Header>
        <Logo />
        <SecondaryButton onClick={onLogOut}>Log out</SecondaryButton>
      </Header>
      <StyledSelect
        options={themeOptions}
        isClearable
        placeholder={"All themes"}
      />
      {reviews &&
        reviews.map((feedbackItem: FeedbackItem) => {
          const themesWithTitles = feedbackItem.themes.map(
            (theme: ReviewTheme) => ({
              ...theme,
              title: themeOptions.find(
                (option) => option.value === theme.theme_id,
              )?.label,
            }),
          );
          return (
            <ReviewCard
              key={feedbackItem.id}
              {...feedbackItem}
              themes={themesWithTitles}
            />
          );
        })}
    </FeedScreenRoot>
  );
};
