import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// Components
import { InputContainer } from "@shared-components/input-container";
import { ErrorMessage } from "../error-message";
import { Title, Paragraph } from "@shared-components/typography";
import { Button } from "@shared-components/buttons";
import { Loader } from "@shared-components/status";
// Store
import { useStoreActions } from "easy-peasy";
// utils
import { fetchJSON } from "@shared-utils";
// types
import { User } from "@shared-types";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(false);

    fetchJSON("auth/login", "POST", {
      email,
      password,
    })
      .then((user: User) => {
        updateAuthStatus({ isLoggedIn: true, id: user.id });
        router.push("/profile");
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Title type="h3" customClassName="mt-8 font-medium">
        Log in
      </Title>
      <Title type="h6" customClassName="mb-4 lg:mb-8">
        <div className="flex items-center">
          <Paragraph>Need an EXPERT:MATCHER account? </Paragraph>
          <Link href="/signup">
            <a className="text-link-color ml-1 underline">Create an account</a>
          </Link>
        </div>
      </Title>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="email"
        placeholder="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        name="email"
        label="Email"
      />
      <InputContainer
        type="password"
        placeholder="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        name="password"
        label="Password"
      />
      <Button
        type="submit"
        text={isProcessing ? <Loader border="border-b-2 border-r-2 border-white" /> : "Log in"}
        customClass="mt-4 h-12 flex items-center justify-center"
        rounded="rounded-sm"
        color="bg-blue-ocean"
        hover="bg-blue-800"
      />
    </form>
  );
};

export default LoginForm;
