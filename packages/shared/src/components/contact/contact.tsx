import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// components
import { ErrorMessage } from "../error-message";
import { InputContainer } from "@shared-components/containers";
// validation
import { ContactFormValidation } from "@shared-validation";

const ContactForm = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "An error has occurred when we were sending the form. Please reload the page an retry."
  );
  const [messageSent, setMessageSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ContactFormValidation().schema),
    defaultValues: ContactFormValidation().initialValues,
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className="my-4 mx-auto flex w-full max-w-screen-lg items-center justify-center rounded-lg px-4 filter md:my-8 lg:my-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="formContainer w-full max-w-xl rounded-xl border-2 border-gray-200 px-8 py-8 shadow-lg"
        >
          <h3 className="mb-6 mt-0  text-left">Contact us</h3>

          {error && <ErrorMessage errorMessage={errorMessage} />}

          <div className="form-group relative flex flex-col">
            <InputContainer
              type="text"
              placeholder="john"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("firstname", e.target.value)}
              name="firstname"
              label="First name"
              register={register}
              error={errors.firstname ? true : false}
              errorMessage={errors.firstname && errors.firstname.message}
            />
          </div>
          <div className="form-group relative flex flex-col">
            <InputContainer
              type="text"
              placeholder="Doe"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("lastname", e.target.value)}
              name="lastname"
              label="Last name"
              register={register}
              error={errors.lastname ? true : false}
              errorMessage={errors.lastname && errors.lastname.message}
            />
          </div>

          <div className="form-group relative flex flex-col">
            <InputContainer
              type="email"
              placeholder="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("senderEmail", e.target.value)}
              name="senderEmail"
              label="Email"
              register={register}
              error={errors.senderEmail ? true : false}
              errorMessage={errors.senderEmail && errors.senderEmail.message}
            />
          </div>
          <div className="form-group relative flex flex-col">
            <InputContainer
              type="text"
              placeholder="Your message"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("message", e.target.value)}
              name="message"
              label="Your message"
              register={register}
              error={errors.message ? true : false}
              errorMessage={errors.message && errors.message.message}
            />
          </div>

          {messageSent && <p className="text-lg font-extrabold text-green-700">Your message has been sent, thank you.</p>}

          <div className="mt-4 text-left">
            <button
              type="submit"
              className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
          text-white hover:bg-blue-800"
            >
              {isProcessing ? "Sending message..." : "Send enquiry"}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
