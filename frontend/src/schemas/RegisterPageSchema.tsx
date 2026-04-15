import * as yup from 'yup';

export const registerPageSchema = yup.object().shape({
    firstName: yup.string().required("The firstname cannot be empty"),
    lastName: yup.string().required("The lastname cannot be empty"),
    username: yup.string().required("The username cannot be empty"),
    birthOfDate: yup.date().nullable().required("The birth date cannot be empty."),
    password: yup.string().required("The username cannot be empty"),
    phone: yup.string().length(11, "Your phone number must be 11 digits long.").required("The phone cannot be empty."),
    email: yup.string().email("Invalid email format").required("The email cannot be empty"),
    address: yup.object().shape({
        country: yup.string().required("The country cannot be empty."),
        city: yup.string().required("The city cannot be empty."),
        district: yup.string().required("The district cannot be empty."),
        street: yup.string().required("The street cannot be empty.")
    })
})