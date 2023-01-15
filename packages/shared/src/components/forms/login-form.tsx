import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Components
import { InputContainer } from "@shared-components/containers";
import { Title, Paragraph } from "@shared-components/typography";
import { Button } from "@shared-components/buttons";
import { Loader, Alert } from "@shared-components/status";
// Store
import { useStoreActions } from "easy-peasy";
// utils
import { fetchJSON } from "@shared-utils";
// types
import { User } from "@shared-types";
// validation
import { logInValidation } from "@shared-validation";

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const updateAuthStatus = useStoreActions((actions: any) => actions.updateUserAuthStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(logInValidation().schema),
    defaultValues: logInValidation().initialValues,
    mode: "onBlur",
  });

  const onSubmit = (data: { email: string; password: string }) => {
    setIsProcessing(true);
    setError(false);

    const { email, password } = data;

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Title type="h3" customClassName="mt-2 mb-3 sm:mb-2 font-medium">
        Log in
      </Title>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
        <Title type="h6" customClassName="my-0">
          Do you need an account?
        </Title>
        <Link href="/signup">
          <a className="text-link-color mb-4 underline sm:mb-0 sm:ml-1">Create an account</a>
        </Link>
      </div>
      {error && <Alert status="error" message={errorMessage} />}
      <InputContainer
        type="email"
        placeholder="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("email", e.target.value)}
        name="email"
        label="Email"
        register={register}
        error={errors.email ? true : false}
        errorMessage={errors.email && errors.email.message}
      />
      <InputContainer
        type="password"
        placeholder="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("password", e.target.value)}
        name="password"
        label="Password"
        register={register}
        error={errors.password ? true : false}
        errorMessage={errors.password && errors.password.message}
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
