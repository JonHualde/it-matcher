import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

// Components
import InputContainer from "../input-container/input-container";
import { ErrorMessage } from "../error-message";

// Store
import { useStoreActions } from "easy-peasy";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const updateAuthStatus = useStoreActions(
    (actions: any) => actions.updateUserAuthStatus
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) throw new Error(result.errorMessage);

        updateAuthStatus(true);
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
      <h3 className="mt-8 font-medium">Log in</h3>
      <h6 className="mb-4 lg:mb-8">
        Need an EXPERT:MATCHER account?{" "}
        <Link href="/signup">
          <a className="ml-1 text-link-color underline">Create an account</a>
        </Link>
      </h6>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <InputContainer
        type="email"
        placeholder="email"
        onChange={setEmail}
        name="email"
        label="Email"
      />
      <InputContainer
        type="password"
        placeholder="password"
        onChange={setPassword}
        name="password"
        label="Password"
      />
      <button
        type="submit"
        className="w-full bg-blue-ocean py-3 rounded-sm flex justify-center text-white font-medium
          hover:bg-blue-800 mt-4"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
