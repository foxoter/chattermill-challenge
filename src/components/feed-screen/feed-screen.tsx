import React, { useEffect } from "react";
import { getThemes } from "../../api/feedback-api";
import { useAuth } from "../../services/auth";
import { SecondaryButton } from "../kit/button";
import { Header } from "../kit/header";
import { Logo } from "../kit/logo";
import { FeedScreenRoot } from "./feed-screen.styled";

type Sentiment = "positive" | "neutral" | "negative";

interface FeedbackItem {
  id: string;
  text: string;
  sentiment: Sentiment;
}

export const FeedScreen: React.FC = () => {
  const auth = useAuth();

  const onLogOut = () => {
    auth?.signOut();
  };

  useEffect(() => {
    getThemes()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const feedbackItems: FeedbackItem[] = [
    {
      id: "id1",
      text: "first feedback item",
      sentiment: "negative",
    },
    {
      id: "id2",
      text: "second feedback item",
      sentiment: "positive",
    },
  ];

  return (
    <FeedScreenRoot>
      <Header>
        <Logo />
        <SecondaryButton onClick={onLogOut}>Log out</SecondaryButton>
      </Header>
      {feedbackItems.map((feedbackItem) => (
        <div key={feedbackItem.id} data-testid={"feedback-item"}>
          {feedbackItem.text}
        </div>
      ))}
    </FeedScreenRoot>
  );
};
