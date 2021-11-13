import * as yup from 'yup'

export const profilValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email"),
    phone: yup
        .string()
})