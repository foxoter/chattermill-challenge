import React, { SyntheticEvent, useState } from "react";
import { Logo } from "../kit/logo";
import { Label } from "../kit/label";
import { Input } from "../kit/input";
import { Heading } from "../kit/heading";
import { Form, FormRow } from "../kit/form";
import { PrimaryButton } from "../kit/button";
import { LoginScreenRoot } from "./login-screen.styled";

export const LoginScreen: React.FC = () => {
  const [formValue, setFormValue] = useState({ login: "", password: "" });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(formValue);
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  return (
    <LoginScreenRoot>
      <Logo />
      <section>
        <Heading>Log in</Heading>
        <Form>
          <FormRow>
            <Label htmlFor={"login"}>Email</Label>
            <Input
              type={"text"}
              placeholder={"login"}
              id={"login"}
              value={formValue.login}
              onChange={onInputChange}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              type={"password"}
              placeholder={"password"}
              id={"password"}
              onChange={onInputChange}
              value={formValue.password}
            />
          </FormRow>
          <FormRow>
            <PrimaryButton type={"submit"} onClick={onSubmit}>
              Log in
            </PrimaryButton>
          </FormRow>
        </Form>
      </section>
    </LoginScreenRoot>
  );
};
