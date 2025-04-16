import * as Yup from 'yup';

export const registerAndLoginSchema = Yup.object().shape({
    correo: Yup
        .string()
        .email('Correo inválido')
        .required('Campo obligatorio')
        .trim()
        .lowercase(),
    password: Yup
        .string()
        .min(8, 'Mínimo 8 caracteres')
        .required('Campo obligatorio'),
});


