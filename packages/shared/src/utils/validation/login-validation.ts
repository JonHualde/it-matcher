import * as Yup from "yup";

const logInValidation = () => {
  return {
    schema: Yup.object().shape({
      email: Yup.string().email("The email is not valid").required("The email is required"),
      password: Yup.string().required("The password is required").min(8, "The password must contain at least 8 characters"),
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      //   "The password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"
      // ),
    }),
    initialValues: {
      email: "",
      password: "",
    },
  };
};

export default logInValidation;
