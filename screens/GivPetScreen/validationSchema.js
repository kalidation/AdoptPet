import * as yup from 'yup'

export const signalValidationSchema = yup.object().shape({
    petName: yup
        .string()
        .required('Name is Required'),
    age: yup
        .number()
        .positive()
        .integer()
        .required('Age is required'),
    phone: yup
        .string()
        .max(11, ({ max }) => `Phone must be ${max} numbers`)
        .required('Phone is required'),
    description: yup
        .string()
        .required('Description is required'),
})