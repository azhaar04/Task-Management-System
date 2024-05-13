import { string, object } from "yup";

export const loginSchema = object().shape({
    email: string().required("This field must not be empty."),
    password: string()
        .min(8, "Password should have atleast 8 character.")
        .required("This field must not be empty."),
});
