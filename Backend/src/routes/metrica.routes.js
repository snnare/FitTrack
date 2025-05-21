import { Router } from 'express';
import { registerMetrica, getMetricaForUser, updateMetrica, deleteMetrica, getMonthlyMetricas} from '../controller/metricas.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();


router.post('/', authMiddleware, registerMetrica);
router.get('/monthly', authMiddleware, getMonthlyMetricas); 
router.get('/', authMiddleware, getMetricaForUser);


router.put('/:id', authMiddleware, updateMetrica)
router.delete('/:id', authMiddleware, deleteMetrica);

export default router;