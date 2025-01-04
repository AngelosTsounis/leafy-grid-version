import * as Yup from "yup";

const updateRecyclingActivitySchema = Yup.object().shape({
  location: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Location must be a string containing only letters and spaces."
    )
    .required("Location is required."),

  materialType: Yup.string()
    .oneOf(
      [
        "Glass",
        "Paper",
        "Plastic",
        "Metal",
        "glass",
        "paper",
        "plastic",
        "metal",
      ],
      "MaterialType must be one of the following: Glass, Paper, Plastic, or Metal."
    )
    .required("MaterialType is required."),

  quantity: Yup.number()
    .positive("Quantity must be a positive number.")
    .required("Quantity is required."),
});

export default updateRecyclingActivitySchema;
