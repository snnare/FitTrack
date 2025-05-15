import Medida from "../models/medida.model.js";


export const crearMedida = async (req, res) => {
    try {
        const {
            fecha,
            peso,
            altura,
            cintura,
            cadera,
            pecho,
            muslo,
            pantorrilla,
            brazoRelajado,
            brazoFlexionado,
            porcentajeGrasaCorporal,
            notas
        } = req.body;


        const userId = req.user.correo;
        const nuevaMedida = new Medida({
            userId,
            fecha,
            peso,
            altura,
            cintura,
            cadera,
            pecho,
            muslo,
            pantorrilla,
            brazoRelajado,
            brazoFlexionado,
            porcentajeGrasaCorporal,
            notas
        });


        await nuevaMedida.save();

        res.status(201).json({
            message: 'Medida creado exitosamente',
            data: nuevaMedida,
        });
    } catch (error) {
        console.log("correo", req.user.correo);
        console.log(req.body);
        res.status(500).json({
            message: 'Error al crear el log',
            error: error.message,
        });
    }
};


export const obtenerMedidas = async (req, res) => {
    try {
        const userId = req.user.correo;
        const medidas = await Medida.find({ userId });
        res.status(200).json({ data: medidas });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener medidas',
            error: error.message,
        });
    }
}


export const eliminarMedida = async (req, res) => {

}