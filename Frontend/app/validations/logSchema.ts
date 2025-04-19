import * as Yup from 'yup';

export const LogSchema = Yup.object().shape({
    ejercicio: Yup
        .string()
        .required('El tipo de ejercicio es obligatorio')
        .trim()
        .max(100, 'El nombre del ejercicio no puede exceder los 100 caracteres'),

    series: Yup
        .number()
        .optional()
        .min(1, 'Debe haber al menos 1 serie')
        .integer('Las series deben ser un número entero')
        .typeError('Las series deben ser un número válido'),

    repeticiones: Yup
        .number()
        .optional()
        .min(1, 'Debe haber al menos 1 repetición')
        .max(100, 'No puede haber más de 100 repeticiones')
        .integer('Las repeticiones deben ser un número entero')
        .typeError('Las repeticiones deben ser un número válido'),

    peso: Yup
        .number()
        .optional()
        .min(0, 'El peso no puede ser negativo')
        .max(500, 'El peso no puede exceder los 500 kg')
        .typeError('El peso debe ser un número válido'),

    notas: Yup
        .string()
        .nullable()
        .optional()
        .max(300, 'Las notas no pueden exceder los 300 caracteres')
        .transform((value) => value === '' ? null : value),
});