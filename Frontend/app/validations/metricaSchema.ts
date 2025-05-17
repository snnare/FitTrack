import * as Yup from 'yup';

export const metricaSchema = Yup.object().shape({
    peso: Yup
        .number()
        .min(0, 'El peso no puede ser negativo')
        .max(300, 'El peso no puede exceder los 500 kg')
        .typeError('El peso debe ser un número válido'),

    altura: Yup
        .number()
        .min(0, 'La altura no debe ser negativa')
        .max(300, ''),
    cintura: Yup
        .number()
        .min(0),
    cadera: Yup
        .number()
        .min(0),
    pecho: Yup
        .number()
        .min(0),
    muslo: Yup
        .number()
        .min(0),
    pantorrilla: Yup
        .number()
        .min(0),
    brazoRelajado: Yup
        .number()
        .min(0),
    brazoFlexionado: Yup
        .number()
        .min(0),
    porcentajeGrasaCorporal: Yup
        .number()
        .min(0)
        .max(100),
    notas: Yup
        .string()
        .trim()
});