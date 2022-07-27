import { Sentiment } from "../../typings/feed";
import styled from "styled-components";
import NegativeIcon from "../../assets/images/negative.png";
import PositiveIcon from "../../assets/images/positive.png";

type ThemeLabelProps = {
  negative?: boolean;
};

type ThemeIconProps = {
  sentiment: Sentiment;
};

const getIconImage = (sentiment: Sentiment) => {
  if (sentiment === Sentiment.NEGATIVE) {
    return NegativeIcon;
  }
  return PositiveIcon;
};

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #d4d8e0;
`;

export const ThemeLabelsContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const ThemeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background-color: ${({ negative }: ThemeLabelProps) =>
    negative ? "#ee30741a" : "#25b1491a"};
  border-radius: 10px;
`;

export const ThemeIcon = styled.div`
  width: 18px;
  height: 18px;
  background-image: url("${({ sentiment }: ThemeIconProps) =>
    getIconImage(sentiment)}");
`;
