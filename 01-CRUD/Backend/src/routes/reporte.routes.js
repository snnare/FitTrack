import express from 'express';
import { generarReporteMensual, obtenerReporte, listarReportesUsuario } from '../controller/reporte.controller.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Ruta para generar un reporte mensual
router.post('/generar', checkAuth, generarReporteMensual);

// Ruta para obtener un reporte específico por mes y año
router.get('/:mes/:año', checkAuth, obtenerReporte);

// Ruta para listar todos los reportes de un usuario
router.get('/', checkAuth, listarReportesUsuario);

export default router;
