import React, { useEffect, useMemo, useState } from "react";
import {
  AllThemesResponse,
  ReviewTheme,
  ThemesFilterOptions,
  ThemeFilter,
  LoadingStatus,
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
import { filterReviews, filterEnabledOptions } from "../../utils/feed";

type ReviewsState = {
  offset: number;
  reviews: FeedbackItem[] | null;
  // status: LoadingStatus;
};

type ThemesFilterState = {
  options: ThemesFilterOptions | [];
  currentFilter: ThemeFilter | null;
};

export const FeedScreen: React.FC = () => {
  const auth = useAuth();
  const [themesFilter, setThemesFilter] = useState<ThemesFilterState>({
    options: [],
    currentFilter: null,
  });
  const [reviewsState, setReviewsState] = useState<ReviewsState>({
    offset: 0,
    reviews: null,
  });

  const enabledFilters =
    (reviewsState.reviews && filterEnabledOptions(reviewsState.reviews)) || [];

  const reviewsToRender =
    reviewsState.reviews &&
    filterReviews(reviewsState.reviews, themesFilter.currentFilter);

  const checkIsOptionDisabled = (enabled: number[], option: ThemeFilter) => {
    return !enabled.includes(option.value);
  };

  const onSelectChange = (option: ThemeFilter) => {
    setThemesFilter({ ...themesFilter, currentFilter: option });
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

  const onLogOut = () => {
    auth?.signOut();
  };

  useEffect(() => {
    Promise.all([getAllThemes(), getReviews({ offset: reviewsState.offset })])
      .then(([themes, reviews]) => {
        const themesData = mapAllThemesToOptions(themes as AllThemesResponse);
        const reviewsData = reviews.data.data;
        setThemesFilter({ ...themesFilter, options: themesData });
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
          isDisabled={!themesFilter.options.length}
          options={themesFilter.options}
          onChange={(option) => onSelectChange(option as ThemeFilter)}
          value={themesFilter.currentFilter}
          isClearable
          placeholder={"All themes"}
          isOptionDisabled={(option) =>
            checkIsOptionDisabled(enabledFilters, option as ThemeFilter)
          }
        />
        <div>
          {reviewsToRender &&
            reviewsToRender.map((feedbackItem: FeedbackItem) => {
              const themesWithTitles = feedbackItem.themes.map(
                (theme: ReviewTheme) => ({
                  ...theme,
                  title: themesFilter.options.find(
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
        {reviewsToRender && (
          <PrimaryButton w={180} centered onClick={loadMoreReviews}>
            Load more
          </PrimaryButton>
        )}
      </SectionContainer>
    </FeedScreenRoot>
  );
};
