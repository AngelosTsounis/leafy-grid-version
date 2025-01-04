import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Username must only contain letters and no symbols or numbers."
    )
    .required("Username is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
});
