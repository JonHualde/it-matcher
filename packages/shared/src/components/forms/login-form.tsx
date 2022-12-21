import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";
import { Title, Paragraph } from "@shared-components/typography";
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
  const router = useRouter();

  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <InputContainer type="email" placeholder="email" onChange={setEmail} name="email" label="Email" />
      <InputContainer type="password" placeholder="password" onChange={setPassword} name="password" label="Password" />
      <button
        type="submit"
        className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
          text-white hover:bg-blue-800"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
