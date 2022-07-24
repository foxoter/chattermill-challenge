import React, { SyntheticEvent, useEffect, useState } from "react";
import { Logo } from "../kit/logo";
import { Label } from "../kit/label";
import { Input } from "../kit/input";
import { Heading } from "../kit/heading";
import { Form, FormRow } from "../kit/form";
import { PrimaryButton } from "../kit/button";
import { LoginScreenRoot } from "./login-screen.styled";
import { LoginCredentials } from "src/typings/login";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../services/auth";

export const LoginScreen: React.FC = () => {
  const auth = useAuth();
  const [formValue, setFormValue] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  useEffect(() => {
    auth?.checkAuth();
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    auth?.signIn(formValue);
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  };

  if (auth?.user) {
    return <Redirect to={"/feed"} />;
  }

  return (
    <LoginScreenRoot>
      <Logo />
      <section>
        <Heading>Log in</Heading>
        <Form>
          <FormRow>
            <Label htmlFor={"username"}>Email</Label>
            <Input
              type={"text"}
              placeholder={"username"}
              id={"username"}
              value={formValue.username}
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
