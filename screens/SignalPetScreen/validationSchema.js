import * as yup from 'yup'

export const signalValidationSchema = yup.object().shape({
    phone: yup
        .string()
        .max(11, ({ max }) => `Phone must be ${max} numbers`),
    description: yup
        .string()
        .required('Description is required'),
})