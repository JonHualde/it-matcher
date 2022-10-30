import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import InputContainer from "../input-container/input-container";
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
          <a className="ml-1 text-link-color underline">Log in</a>
        </Link>
      </h6>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <div className="flex flex-col lg:flex-row">
        <InputContainer type="text" placeholder="John" onChange={setFirstname} name="firstName" label="First name" width="full lg:mr-2" />
        <InputContainer type="text" placeholder="Doe" onChange={setLastname} name="lastName" label="Last name" width="full lg:ml-2" />
      </div>
      <InputContainer type="email" placeholder="email" onChange={setEmail} name="email" label="Email" />
      <div className="flex flex-col lg:flex-row">
        <InputContainer
          type="password"
          placeholder="password"
          onChange={setPassword}
          name="password"
          label="Password"
          width="full lg:mr-2"
        />
        <InputContainer
          type="password"
          placeholder="confirmPassword"
          onChange={setConfirmPassword}
          name="confirmPassword"
          label="Confirm Password"
          width="full lg:ml-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-ocean py-3 rounded-sm flex justify-center text-white font-medium
        hover:bg-blue-800 mt-4"
      >
        Sign up{" "}
      </button>
    </form>
  );
};

export default SignUpForm;
