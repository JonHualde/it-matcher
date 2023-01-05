import { useState } from "react";
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
// types
import { User } from "@shared-types";
// utils
import { fetchJSON } from "@shared-utils";
// validation
import { RegisterValidation } from "@shared-validation";

const SignUpForm = () => {
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
    resolver: yupResolver(RegisterValidation().schema),
    defaultValues: RegisterValidation().initialValues,
    mode: "onBlur",
  });

  const onSubmit = (data: { email: string; firstName: string; lastName: string; password: string }) => {
    setIsProcessing(true);
    setError(false);

    const { email, password, firstName, lastName } = data;

    fetchJSON("auth/register", "POST", {
      email,
      password,
      firstName,
      lastName,
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
      <Title type="h3" customClassName="mt-6 mb-0 font-medium">
        Register
      </Title>
      <Title type="h6" customClassName="mb-4 lg:mb-8">
        <div className="flex flex-col sm:flex-row">
          <Paragraph size="large"> Already have an account?</Paragraph>
          <Link href="/login">
            <a className="text-link-color underline sm:ml-1">Log in</a>
          </Link>
        </div>
      </Title>
      {error && <Alert status="error" message={errorMessage} />}
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 md:gap-x-2">
        <InputContainer
          type="text"
          placeholder="John"
          onChange={(e) => setValue("firstName", e.target.value)}
          name="firstName"
          label="First name"
          width="full lg:mr-2"
          register={register}
          error={errors.firstName ? true : false}
          errorMessage={errors.firstName && errors.firstName.message}
        />
        <InputContainer
          type="text"
          placeholder="Doe"
          onChange={(e) => setValue("lastName", e.target.value)}
          name="lastName"
          label="Last name"
          width="full lg:ml-2"
          register={register}
          error={errors.lastName ? true : false}
          errorMessage={errors.lastName && errors.lastName.message}
        />
      </div>
      <InputContainer
        type="email"
        placeholder="email"
        onChange={(e) => setValue("email", e.target.value)}
        name="email"
        label="Email"
        register={register}
        error={errors.email ? true : false}
        errorMessage={errors.email && errors.email.message}
      />
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 md:gap-x-2">
        <InputContainer
          type="password"
          placeholder="password"
          onChange={(e) => setValue("password", e.target.value)}
          name="password"
          label="Password"
          width="full lg:mr-2"
          register={register}
          error={errors.password ? true : false}
          errorMessage={errors.password && errors.password.message}
        />
        <InputContainer
          type="password"
          placeholder="confirm password"
          onChange={(e) => setValue("confirmPassword", e.target.value)}
          name="confirmPassword"
          label="Confirm Password"
          width="full lg:ml-2"
          register={register}
          error={errors.confirmPassword ? true : false}
          errorMessage={errors.confirmPassword && errors.confirmPassword.message}
        />
      </div>
      <Button
        type="submit"
        text={isProcessing ? <Loader border="border-b-2 border-r-2 border-white" /> : "Sign up"}
        customClass="mt-4 h-12 flex items-center justify-center"
        rounded="rounded-sm"
        color="bg-blue-ocean"
        hover="bg-blue-800"
      />
    </form>
  );
};

export default SignUpForm;
