import styled from "styled-components";

export const Button = styled.button`
  font-family: inherit;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  color: #1c0a36;
  border: none;
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  letter-spacing: 0.2px;
  white-space: nowrap;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: color 0.12s linear, background-color 0.12s linear;

  &:disabled {
    pointer-events: none;
    cursor: default;
  }
`;

export const PrimaryButton = styled(Button)`
  border-radius: 10px;
  color: #ffffff;
  background: #326bc5;

  &:hover {
    background: #1e63ce;
  }

  &:active {
    background: #21519c;
  }
`;

export const SecondaryButton = styled(Button)`
  border-radius: 10px;
  border: 1px solid #d4d8e0;
  padding: 10px 20px;
  color: #908fb9;
  background: #fbfbfb;

  &:hover {
    background: #ebebeb;
  }

  &:active {
    background: #d9d9d9;
  }
`;
