import styled from "styled-components";

type Props = {
  fz?: number;
  lh?: number;
  color?: string;
};

export const Text = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: ${({ fz }: Props) => (fz ? `${fz}px` : "14px")};
  line-height: ${({ lh }: Props) => (lh ? `${lh}px` : "20px")};
  color: ${({ color }: Props) => (color ? color : "#1c0a36")};
`;
