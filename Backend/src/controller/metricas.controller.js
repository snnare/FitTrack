import Metrica from "../models/metrica.model.js";


export const registerMetrica = async (req, res) => {
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
        const nuevaMedida = new Metrica({
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
            message: 'Medida creado exitosamente'
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



export const getMetricaForUser = async (req, res) => {
    try {
        const userId = req.user.correo;
        const medidas = await Metrica.find({ userId }).sort({ fecha: 1 });
        res.status(200).json({ data: medidas });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener medidas',
            error: error.message,
        });
    }
}


export const deleteMetrica = async (req, res) => {
    try {
        
        const { id } = req.params;
        const userId = req.user.correo; // O req.user._id
        const deletedMedida = await Metrica.findOneAndDelete({ _id: id, userId: userId });

        if (!deletedMedida) {
            return res.status(404).json({ message: 'Métrica no encontrada o no tienes permiso para eliminarla.' });
        }

        res.status(200).json({
            message: 'Métrica eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar la métrica:', error);
        res.status(500).json({
            message: 'Error al eliminar la métrica',
            error: error.message,
        });
    }
}


export const updateMetrica = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.correo;
        const updates = req.body;

        const updatedMedida = await Metrica.findOneAndUpdate(
            { _id: id, userId: userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedMedida) {
            return res.status(404).json({ message: 'Métrica no encontrada o no tienes permiso para actualizarla.' });
        }

        res.status(200).json({
            message: 'Métrica actualizada',
            data: updatedMedida
        });
    } catch (error) {
        console.error('Error al actualizar la métrica:', error);
        res.status(500).json({
            message: 'Error al actualizar la métrica',
            error: error.message,
        });
    }
};


export const getMonthlyMetricas = async (req, res) => { 
    try {
        const userId = req.user.correo;
        const { month, year } = req.query;

        if (!month || !year || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
            return res.status(400).json({ msg: 'Se requieren el mes y el año válidos.' });
        }

        const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endOfMonth = new Date(parseInt(year), parseInt(month), 0);

        const metricas = await Metrica.find({
            userId,
            fecha: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        }).sort({ createdAt: 1 });
        res.status(200).json(metricas);
    } catch (error) {
        console.log(req.user.correo)
        res.status(500).json({ msg: 'Error del servidor al obtener métricas mensuales.' });
    }
}