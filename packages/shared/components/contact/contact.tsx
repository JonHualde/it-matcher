import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import { ErrorMessage } from "../error-message";
import InputContainer from "../input-container/input-container";

const ContactForm = () => {
  const [error, setError] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(
    "An error has occurred when we were sending the form. Please reload the page an retry."
  );

  const validationSchema = Yup.object().shape({
    senderEmail: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    firstname: Yup.string()
      .required("A first name is required")
      .min(2, "The first name must be 2 characters long minimum")
      .max(50, "The first name cannot exceed 50 characters"),
    lastname: Yup.string()
      .required("A last name is required")
      .min(2, "The last name must be 2 characters long minimum")
      .max(50, "The last name cannot exceed 50 characters"),
    message: Yup.string()
      .required("A message is required")
      .min(10, "The message field must be 10 characters long minimum")
      .max(5000, "The message field cannot exceed 5000 characters"),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      message: "",
      senderEmail: "",
    },
    validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      console.log(values);
      return;
    },
  });

  return (
    <React.Fragment>
      <div
        className="flex
        items-center
        justify-center
			w-full
			max-w-screen-lg
			rounded-lg
			filter
			my-4
            lg:my-12
			mx-auto
			md:my-8
			px-4"
      >
        <form
          onSubmit={handleSubmit}
          className="formContainer w-full max-w-xl border-2 border-gray-200 px-8 py-8 rounded-xl shadow-lg"
        >
          <h3 className="mb-6 text-left  mt-0">Contact us</h3>

          {error && <ErrorMessage errorMessage={errorMessage} />}

          <div className="form-group flex flex-col relative">
            <InputContainer
              type="text"
              placeholder="john"
              onChange={handleChange}
              value={values.firstname}
              name="firstname"
              label="First name"
              errors={errors.firstname}
            />
          </div>
          <div className="form-group flex flex-col relative">
            <InputContainer
              type="text"
              placeholder="Doe"
              onChange={handleChange}
              value={values.lastname}
              name="lastname"
              label="Last name"
              errors={errors.lastname}
            />
          </div>

          <div className="form-group flex flex-col relative">
            <InputContainer
              type="email"
              placeholder="email"
              onChange={handleChange}
              name="senderEmail"
              value={values.senderEmail}
              label="Email"
              errors={errors.senderEmail}
            />
          </div>
          <div className="form-group flex flex-col relative">
            <InputContainer
              type="text"
              placeholder="Your message"
              onChange={handleChange}
              value={values.message}
              name="message"
              label="Your message"
              errors={errors.message}
            />
          </div>

          {messageSent && (
            <p className="text-lg font-extrabold text-green-700">
              Your message has been sent, thank you.
            </p>
          )}

          <div className="mt-4 text-left">
            <button
              type="submit"
              className="w-full bg-blue-ocean py-3 rounded-sm flex justify-center text-white font-medium
          hover:bg-blue-800 mt-4"
            >
              {isSubmitting ? "Sending message..." : "Send enquiry"}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
