import express from 'express';
import { getReporte } from '../controller/reporte.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getReporte);
router.post('/', authMiddleware, getReporte);

export default router;