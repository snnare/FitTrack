import { Router} from 'express';
import {createReporte, getReporte} from '../controller/reporte.controller.js';


const router = Router();

router.post('/:userId', createReporte); // Crear un nuevo reporte
router.get('/:userId', getReporte); // Obtener un reporte por userId


export default router;
