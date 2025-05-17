import { Router } from 'express';
import { registerMetrica, getMetricaForUser} from '../controller/metricas.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();


router.post('/', authMiddleware, registerMetrica);
router.get('/get', authMiddleware, getMetricaForUser);

export default router;