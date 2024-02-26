import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  type: yup.string().required(),
  price: yup.number().required().moreThan(100),
  quantityInStock: yup.number().required().min(0),
  description: yup.string().required(),
  // pictureURL: yup.string(),
  file: yup.mixed().when("pictureURL", ([pictureURL], schema: any) => {
    return pictureURL ? schema : schema.required("Please provide an image!");
  }),
});
