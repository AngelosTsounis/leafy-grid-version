import * as Yup from "yup";

export const profileUpdateSchema = Yup.object({
  username: Yup.string()
    .notRequired() // Field is not required
    .matches(/^[a-zA-Z\s]+$/, "Username must only contain letters and spaces.")
    .nullable(), // Allows empty or null values
  newPassword: Yup.string()
    .notRequired()
    .min(8, "Password must be at least 8 characters long.")
    .nullable(),
});
