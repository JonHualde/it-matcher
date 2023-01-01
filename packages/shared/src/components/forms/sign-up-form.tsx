import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import { InputContainer } from "@shared-components/containers";
import { ErrorMessage } from "../error-message";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [instagramUsername, setInstagramUserName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [notionPageUrl, setNotionPageUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    fetch("/api/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        linkedInUrl,
        instagramUsername,
        websiteUrl,
        notionPageUrl,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.errorMessage);

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
        Already have an account?
        <Link href="/login">
          <a className="text-link-color ml-1 underline">Log in</a>
        </Link>
      </h6>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <div className="flex flex-col lg:flex-row">
        <InputContainer
          type="text"
          placeholder="John"
          onChange={(e) => setFirstname(e.target.value)}
          name="firstName"
          label="First name"
          width="full lg:mr-2"
        />
        <InputContainer
          type="text"
          placeholder="Doe"
          onChange={(e) => setLastname(e.target.value)}
          name="lastName"
          label="Last name"
          width="full lg:ml-2"
        />
      </div>
      <InputContainer type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} name="email" label="Email" />
      <div className="flex flex-col lg:flex-row">
        <InputContainer
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          width="full lg:mr-2"
        />
        <InputContainer
          type="password"
          placeholder="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
          label="Confirm Password"
          width="full lg:ml-2"
        />
      </div>
      <button
        type="submit"
        className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
        text-white hover:bg-blue-800"
      >
        Sign up{" "}
      </button>
    </form>
  );
};

export default SignUpForm;
