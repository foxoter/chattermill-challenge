import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-gap: 18px 0;
`;

type FormRowProps = {
  withButton?: boolean;
};

export const FormRow = styled.div`
  position: ${(props: FormRowProps) =>
    props.withButton ? "relative" : "static"};
  display: grid;
  grid-gap: 8px 0;
`;

export const FormIconButton = styled.div`
  position: absolute;
  right: 3%;
  bottom: 20%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12' viewBox='0 0 24 24'%3E%3Cpath d='M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 7.449-11.985 7.449c-7.18 0-12.015-7.449-12.015-7.449s4.446-6.551 12.015-6.551c7.694 0 11.985 6.551 11.985 6.551zm-7 .449c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5 0 2.762 2.239 5 5 5 2.762 0 5-2.238 5-5z'/%3E%3C/svg%3E");
  width: 16px;
  height: 12px;
  cursor: pointer;
`;
