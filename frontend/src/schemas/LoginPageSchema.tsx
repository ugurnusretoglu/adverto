import * as yup from 'yup';

export const loginPageSchema = yup.object().shape({
    username: yup.string().required("The username cannot be empty"),
    password: yup.string().required("The username cannot be empty"),
})