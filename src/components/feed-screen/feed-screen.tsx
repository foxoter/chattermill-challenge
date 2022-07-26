import React, { useEffect, useState } from "react";
import {
  AllThemesResponse,
  ReviewTheme,
  ThemesFilterOptions,
} from "../../typings/feed";
import { getReviews, getAllThemes } from "../../api/feedback-api";
import { useAuth } from "../../services/auth";
import { PrimaryButton, SecondaryButton } from "../kit/button";
import { Header } from "../kit/header";
import { Logo } from "../kit/logo";
import { SectionContainer } from "../kit/container";
import { StyledSelect } from "../kit/select";
import { FeedScreenRoot } from "./feed-screen.styled";
import { FeedbackItem } from "../../typings/feed";
import { ReviewCard } from "../review-card";
import { mapAllThemesToOptions } from "../../utils/api";
import { OFFSET_STEP } from "../../constants/api";

type ReviewsState = {
  offset: number;
  reviews: FeedbackItem[] | null;
};

export const FeedScreen: React.FC = () => {
  const [themeOptions, setThemeOptions] = useState<ThemesFilterOptions | []>(
    [],
  );
  const [reviewsState, setReviewsState] = useState<ReviewsState>({
    offset: 0,
    reviews: null,
  });
  const auth = useAuth();

  const onLogOut = () => {
    auth?.signOut();
  };

  const loadMoreReviews = () => {
    getReviews({ offset: reviewsState.offset })
      .then((res) => {
        const newBatch = res.data.data;
        const updatedReviews = reviewsState.reviews && [
          ...reviewsState.reviews,
          ...newBatch,
        ];
        setReviewsState({
          reviews: updatedReviews,
          offset: reviewsState.offset + OFFSET_STEP,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Promise.all([getAllThemes(), getReviews({ offset: reviewsState.offset })])
      .then(([themes, reviews]) => {
        const themesData = mapAllThemesToOptions(themes as AllThemesResponse);
        const reviewsData = reviews.data.data;
        setThemeOptions(themesData);
        setReviewsState({
          reviews: reviewsData,
          offset: reviewsState.offset + OFFSET_STEP,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FeedScreenRoot>
      <Header>
        <Logo />
        <SecondaryButton onClick={onLogOut}>Log out</SecondaryButton>
      </Header>
      <SectionContainer>
        <StyledSelect
          options={themeOptions}
          isClearable
          placeholder={"All themes"}
        />
        <div>
          {reviewsState.reviews &&
            reviewsState.reviews.map((feedbackItem: FeedbackItem) => {
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
        </div>
        <PrimaryButton w={180} centered onClick={loadMoreReviews}>
          Load more
        </PrimaryButton>
      </SectionContainer>
    </FeedScreenRoot>
  );
};
