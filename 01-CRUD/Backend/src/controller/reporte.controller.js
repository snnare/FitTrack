import Reporte from '../models/Reporte.js';
import Log from '../models/Logs.js';



export const createReporte = async (req, res) => {
    try {
        // userID es el correo
        const { userId } = req.params;

        // Obtener todos los logs del usuario
        const logs = await Log.find({ userId });

        if (!logs.length) {
            return res.status(404).json({ message: 'No hay registros para generar el reporte' });
        }

        // Calcular estadísticas
        const totalSeries = logs.reduce((sum, log) => sum + (log.series || 0), 0);
        const totalRepeticiones = logs.reduce((sum, log) => sum + (log.repeticiones || 0), 0);
        const totalEjercicios = logs.length;

        const pesos = logs.map(log => log.peso || 0).filter(p => p > 0);
        const pesoPromedio = pesos.length ? (pesos.reduce((sum, p) => sum + p, 0) / pesos.length).toFixed(2) : 0;
        const pesoMaximo = pesos.length ? Math.max(...pesos) : 0;

        // Estructurar los datos
        const datosReporte = {
            totalEjercicios,
            totalSeries,
            totalRepeticiones,
            pesoPromedio: parseFloat(pesoPromedio),
            pesoMaximo,
        };

        // Crear y guardar el reporte
        const nuevoReporte = new Reporte({
            userId,
            datos: datosReporte,
        });

        await nuevoReporte.save();

        res.status(201).json({
            message: 'Reporte generado con éxito',
            reporte: nuevoReporte,
        });
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({
            message: 'Error interno al generar el reporte',
            error: error.message,
        });
    }
};


export const getReporte = async (req, res) => {
    try {
        const { userId } = req.params;

        const reportes = await Reporte.find({ userId }).sort({ createdAt: -1 });

        if (!reportes.length) {
            return res.status(404).json({ message: 'No hay reportes disponibles para este usuario' });
        }

        res.status(200).json({
            message: 'Reportes obtenidos con éxito',
            reportes,
        });
    } catch (error) {
        console.error('Error al obtener los reportes:', error);
        res.status(500).json({
            message: 'Error interno al obtener los reportes',
            error: error.message,
        });
    }
};