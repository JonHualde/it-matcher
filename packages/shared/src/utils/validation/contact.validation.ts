import * as Yup from "yup";

const ContactFormValidation = () => {
  return {
    schema: Yup.object().shape({
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
    }),
    initialValues: {
      firstname: "",
      lastname: "",
      message: "",
      senderEmail: "",
    },
  };
};

export default ContactFormValidation;
