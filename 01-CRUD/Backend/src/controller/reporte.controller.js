import Reporte from '../models/Reporte.js';
import Log from '../models/Log.js';
import User from '../models/User.js';

/**
 * Generar un reporte mensual de rutinas para un usuario
 */
export const generarReporteMensual = async (req, res) => {
  try {
    const {mes, año } = req.body;

    // Obtener todos los logs del mes y año para el usuario
    const logs = await Log.find({
      createdAt: {
        $gte: new Date(año, mes - 1, 1),
        $lt: new Date(año, mes, 1),
      },
    });

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No hay registros para este mes' });
    }

    // Calcular estadísticas del reporte
    const totalEjercicios = logs.length;
    const totalSeries = logs.reduce((sum, log) => sum + log.series, 0);
    const totalRepeticiones = logs.reduce((sum, log) => sum + log.repeticiones, 0);
    const pesoPromedio = logs.reduce((sum, log) => sum + log.peso, 0) / logs.length;
    const pesoMaximo = Math.max(...logs.map(log => log.peso));

    // Crear el reporte
    const nuevoReporte = new Reporte({
      usuario: userId,
      mes,
      año,
      totalEjercicios,
      totalSeries,
      totalRepeticiones,
      pesoPromedio: parseFloat(pesoPromedio.toFixed(2)),
      pesoMaximo,
      logs: logs.map(log => log._id),
    });

    await nuevoReporte.save();

    res.status(201).json({
      message: 'Reporte generado exitosamente',
      reporte: nuevoReporte,
    });
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    res.status(500).json({ message: 'Error al generar el reporte', error: error.message });
  }
};

/**
 * Obtener un reporte específico por mes y año
 */
export const obtenerReporte = async (req, res) => {
  try {
    const { userId, mes, año } = req.params;

    const reporte = await Reporte.findOne({ usuario: userId, mes, año }).populate('logs');

    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    res.status(200).json(reporte);
  } catch (error) {
    console.error('Error al obtener el reporte:', error);
    res.status(500).json({ message: 'Error al obtener el reporte', error: error.message });
  }
};

/**
 * Listar todos los reportes de un usuario
 */
export const listarReportesUsuario = async (req, res) => {
  try {
    const { userId } = req.params;

    const reportes = await Reporte.find({ usuario: userId }).sort({ creadoEn: -1 });

    if (reportes.length === 0) {
      return res.status(404).json({ message: 'No hay reportes disponibles' });
    }

    res.status(200).json(reportes);
  } catch (error) {
    console.error('Error al listar los reportes:', error);
    res.status(500).json({ message: 'Error al listar los reportes', error: error.message });
  }
};
