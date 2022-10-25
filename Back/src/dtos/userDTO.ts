import * as yup from 'yup';

export interface createUserDTO {
    name: string;
    username: string;
    password: string;
    cpf: string;
    email: string;
    phone: string;
    public_place: string;
    house_number: string;
    district: string;
    zip_code: string;
    city: string;
}

export const createUserRequestSchema = yup.object({
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    cpf: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    public_place: yup.string().required(),
    house_number: yup.string().required(),
    district: yup.string().required(),
    zip_code: yup.string().required(),
    city: yup.string().required(),
});