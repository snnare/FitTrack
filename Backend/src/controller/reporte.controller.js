
import Reporte from '../models/Reporte.js';
import { generarReportePDF } from '../utils/latex/generarReporte.js';

export const createReporte = async (req, res) => {
    try {
        const userId = req.user.correo; 
        const { datos } = req.body;

        const nuevoReporte = new Reporte({
            userId,
            datos,
        });

        await nuevoReporte.save();

        const pdfPath = await generarReportePDF(userId);

        const nombreArchivo = path.basename(pdfPath);
        const url = `${req.protocol}://${req.get('host')}/reports/${nombreArchivo}`;

        res.status(201).json({ 
            message: 'Reporte creado y PDF generado', 
            data: nuevoReporte,
            pdfUrl: url
        });
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

