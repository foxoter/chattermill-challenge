import React, { useEffect, useState } from "react";
import { Theme } from "../../typings/feed";
import { getThemes } from "../../api/feedback-api";
import { useAuth } from "../../services/auth";
import { SecondaryButton } from "../kit/button";
import { Header } from "../kit/header";
import { Logo } from "../kit/logo";
import { StyledSelect } from "../kit/select";
import { FeedScreenRoot } from "./feed-screen.styled";
import { FeedbackItem } from "../../typings/feed";
import { ReviewCard } from "../review-card";

const feedbackItems: FeedbackItem[] = [
  {
    id: "id1",
    comment: "first feedback item",
    themes: [
      { theme_id: 123, sentiment: 1 },
      { theme_id: 333, sentiment: -1 },
    ],
    created_at: "2019-07-18T23:10:33Z",
  },
  {
    id: "id2",
    comment: "second feedback item",
    themes: [{ theme_id: 555, sentiment: 0 }],
    created_at: "2019-07-18T23:10:33Z",
  },
];

export const FeedScreen: React.FC = () => {
  const [themeOptions, setThemeOptions] = useState([]);
  const auth = useAuth();

  const onLogOut = () => {
    auth?.signOut();
  };

  useEffect(() => {
    getThemes()
      .then((res) => {
        // console.log(res.data.data);
        const { data } = res.data;
        const options = data.map((theme: Theme) => ({
          value: theme.id,
          label: theme.name,
        }));
        setThemeOptions(options);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FeedScreenRoot>
      <Header>
        <Logo />
        <SecondaryButton onClick={onLogOut}>Log out</SecondaryButton>
      </Header>
      <StyledSelect options={themeOptions} />
      {feedbackItems.map((feedbackItem) => (
        <ReviewCard {...feedbackItem} key={feedbackItem.id} />
      ))}
    </FeedScreenRoot>
  );
};
