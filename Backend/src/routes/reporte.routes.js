import { Router} from 'express';
import {createReporte, getReporte} from '../controller/reporte.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createReporte); 
router.get('/', authMiddleware, getReporte); 

export default router;