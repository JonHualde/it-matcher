import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import { ErrorMessage } from "../error-message";
import { InputContainer } from "@shared-components/containers";

const ContactForm = () => {
  const [error, setError] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(
    "An error has occurred when we were sending the form. Please reload the page an retry."
  );

  const validationSchema = Yup.object().shape({
    senderEmail: Yup.string().email("Email not valid").required("Email is required"),
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

  const { handleSubmit, handleChange, values, errors, touched, isSubmitting, resetForm } = useFormik({
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
        className="my-4
        mx-auto
        flex
			w-full
			max-w-screen-lg
			items-center
			justify-center
			rounded-lg
            px-4
			filter
			md:my-8
			lg:my-12"
      >
        <form onSubmit={handleSubmit} className="formContainer w-full max-w-xl rounded-xl border-2 border-gray-200 px-8 py-8 shadow-lg">
          <h3 className="mb-6 mt-0  text-left">Contact us</h3>

          {error && <ErrorMessage errorMessage={errorMessage} />}

          <div className="form-group relative flex flex-col">
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
          <div className="form-group relative flex flex-col">
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

          <div className="form-group relative flex flex-col">
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
          <div className="form-group relative flex flex-col">
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

          {messageSent && <p className="text-lg font-extrabold text-green-700">Your message has been sent, thank you.</p>}

          <div className="mt-4 text-left">
            <button
              type="submit"
              className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
          text-white hover:bg-blue-800"
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
