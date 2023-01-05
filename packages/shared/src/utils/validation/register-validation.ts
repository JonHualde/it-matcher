import * as Yup from "yup";

const RegisterValidation = () => {
  return {
    schema: Yup.object().shape({
      email: Yup.string().trim().email("The email is not valid").required("The email is required"),
      firstName: Yup.string()
        .trim()
        .required("The first name is required")
        .min(2, "The first name must contain at least 2 characters")
        .max(40, "The first name must contain at most 40 characters"),
      lastName: Yup.string()
        .trim()
        .required("The last name is required")
        .min(2, "The last name must contain at least 2 characters")
        .max(40, "The last name must contain at most 40 characters"),
      password: Yup.string()
        .required("The password is required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "The password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"
        ),
      confirmPassword: Yup.string().test("match", "The passwords don't match", function (passwordConfirm) {
        return passwordConfirm === this.parent.password;
      }),
    }),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };
};

export default RegisterValidation;
