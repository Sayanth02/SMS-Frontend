import * as Yup from 'yup';

export const validationSchema = Yup.object({
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
