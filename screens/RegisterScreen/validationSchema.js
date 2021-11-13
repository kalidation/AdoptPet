import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be ${min} charecters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .min(8, ({ min }) => `Password must be ${min} charecters`)
        .required('Confirm Password is required')
})