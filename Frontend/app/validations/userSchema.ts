import * as Yup from 'yup';

export const updateSchema = Yup.object().shape({
    nombre: Yup
        .string()
        .trim()
        .min(2, 'Muy corto')
        .max(50, 'Muy largo')
        .required('Campo obligatorio'),
    apellidos: Yup
        .string()
        .trim()
        .min(2, 'Muy corto')
        .max(50, 'Muy largo')
        .required('Campo obligatorio'),
    fechaNacimiento: Yup
        .date()
        .nullable()
        .required('Campo obligatorio')
        .typeError('Fecha inválida')
        .max(new Date(), 'No puedes ser del futuro'),
    genero: Yup
        .string()
        .oneOf(['Masculino', 'Femenino'], 'Género no válido')
        .nullable()
        .optional(),
    peso: Yup
        .number()
        .nullable()
        .optional()
        .min(30, 'Peso mínimo 30 kg')
        .max(300, 'Peso máximo 300 kg'),
    estatura: Yup
        .number()
        .nullable()
        .optional()
        .min(1, 'Estatura mínima 1 cm')
        .max(300, 'Estatura máxima 300 cm'),
    objetivo: Yup
        .string()
        .oneOf(['Perder peso', 'Ganar peso', 'Definir', 'Mantener'], 'Objetivo no válido')
        .nullable()
        .optional(),
    nivelExperiencia: Yup
        .string()
        .oneOf(['Principiante', 'Intermedio', 'Avanzado'], 'Nivel de experiencia no válido')
});
