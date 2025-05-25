import Reporte from '../models/reporte.model.js';
import User from '../models/user.model.js';
import {
    verifyReportCreationEligibility,
    calculateMonthlyProgressAnalysis,
    generateExecutiveSummary,
    fetchMonthlyMetrics,
    fetchMonthlyLogs,
    mapWeeklyMetricsData,
    findReportForUser
} from '../utils/reporte.utils.js';


export const createReporte = async (req, res) => {
    try {
        const userId = req.user.correo;
        const { mes, anio } = req.body;

        if (!mes || !anio) {
            return res.status(400).json({
                message: 'Error',
                error: 'Se deben proporcionar el mes y el año del reporte en el cuerpo de la petición.'
            });
        }

        const mesReportado = parseInt(mes);
        const anioReportado = parseInt(anio);

        const eligibility = await verifyReportCreationEligibility(userId, mesReportado, anioReportado);

        if (!eligibility.success) {
            return res.status(eligibility.reporteExistente ? 200 : 400).json({
                message: 'Error',
                error: eligibility.message,
                details: {
                    reporteExistente: eligibility.reporteExistente,
                    isMonthEnded: eligibility.isMonthEnded,
                    metricsMet: eligibility.metricsMet,
                    logsMet: eligibility.logsMet
                }
            });
        }

        const userInfo = await User.findOne({ correo: userId }).select('-password');
        if (!userInfo) {
            return res.status(404).json({ message: 'Error', error: 'Información de usuario no encontrada.' });
        }
        const objetivoDelUsuario = userInfo.objetivo || "No especificado";
        const generoDelUsuario = userInfo.genero;

        const medidasMensuales = await fetchMonthlyMetrics(userId, mesReportado, anioReportado);
        const logsMensuales = await fetchMonthlyLogs(userId, mesReportado, anioReportado);

        const totalLogsEsteMes = logsMensuales.length;

        const analisisProgresoMensualCalculado = calculateMonthlyProgressAnalysis(medidasMensuales, userInfo);

        const datosMedidasSemanales = mapWeeklyMetricsData(medidasMensuales);

        const fechaReporteFormateada = `${new Date(anioReportado, mesReportado - 1).toLocaleString('default', { month: 'long' })} ${anioReportado}`;
        const resumenEjecutivoGenerado = generateExecutiveSummary(
            objetivoDelUsuario,
            analisisProgresoMensualCalculado,
            totalLogsEsteMes,
            generoDelUsuario
        );

        const nuevoReporte = new Reporte({
            userId: userId,
            mesReportado: mesReportado,
            anioReportado: anioReportado,
            fechaCreacion: new Date(),
            tituloReporte: "Reporte Mensual de Progreso Físico",
            nombreUsuario: `${userInfo.nombre}  ${userInfo.apellidos}`,
            generoUsuario: generoDelUsuario,
            fechaReporte: fechaReporteFormateada,
            objetivoUsuario: objetivoDelUsuario,
            resumenEjecutivo: resumenEjecutivoGenerado,
            datosMedidasSemanales: datosMedidasSemanales,
            analisisProgresoMensual: analisisProgresoMensualCalculado,
        });

        await nuevoReporte.save();
        res.status(201).json({ message: 'OK' });
    } catch (error) {
        console.error('Error al crear la información del reporte:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
};


export const getReporte = async (req, res) => {
    try {
        const userId = req.user.correo;
        const queryMes = req.query.mes;
        const queryAnio = req.query.anio;

        let mes = null;
        let anio = null;

        if (queryMes && queryAnio) {
            mes = parseInt(queryMes);
            anio = parseInt(queryAnio);

            if (isNaN(mes) || mes < 1 || mes > 12) {
                return res.status(400).json({ message: 'Error', error: 'El parámetro "mes" debe ser un número entre 1 y 12.' });
            }
            if (isNaN(anio) || anio < 2000) {
                return res.status(400).json({ message: 'Error', error: 'El parámetro "anio" debe ser un número válido (ej. 2023).' });
            }
        }

        const reporteEncontrado = await findReportForUser(userId, mes, anio);

        if (reporteEncontrado) {
            return res.status(200).json({ message: 'OK', data: reporteEncontrado });
        } else {
            if (mes !== null && anio !== null) {
                return res.status(404).json({ message: 'Error', error: `No se encontró un reporte para ${new Date(anio, mes - 1).toLocaleString('es-MX', { month: 'long', year: 'numeric' })}.` });
            } else {
                return res.status(404).json({ message: 'Error', error: 'No se encontraron reportes para este usuario.' });
            }
        }

    } catch (error) {
        console.error('Error al obtener la información del reporte:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
};