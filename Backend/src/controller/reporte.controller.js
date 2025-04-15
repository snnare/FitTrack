import Reporte from '../models/Reporte.js';
import Log from '../models/Logs.js';


export const createReporte = async (req, res) => {
    try {
        const userId = req.user.correo; 
        const { datos } = req.body;

        const nuevoReporte = new Reporte({
            userId,
            datos,
        });

        await nuevoReporte.save();

        res.status(201).json({ message: 'Reporte creado exitosamente', data: nuevoReporte });
    } catch (error) {
        console.error('Error al crear reporte:', error);
        res.status(500).json({ message: 'Error al crear reporte', error: error.message });
    }
};

export const getReporte = async (req, res) => {
    try {
        const userId = req.user.correo; 

        const reporte = await Reporte.findOne({ userId });

        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.status(200).json(reporte);
    } catch (error) {
        console.error('Error al obtener reporte:', error);
        res.status(500).json({ message: 'Error al obtener reporte', error: error.message });
    }
};