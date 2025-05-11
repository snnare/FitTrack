import { Router } from 'express';
import { getInfoPersonal , getHistorialMedidas, getHistorialEntrenamientos, getRachaActual} from '../controller/data.controler.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/info-personal', authMiddleware, getInfoPersonal);
router.get('/info-medidas', authMiddleware, getHistorialMedidas);
router.get('/info-logs', authMiddleware, getHistorialEntrenamientos);
router.get('/info-streak', authMiddleware, getRachaActual);
export default router;