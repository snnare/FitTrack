import express from 'express';
import { createReporte, getReporte } from '../controller/reporte.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/',  authMiddleware, getReporte);
router.post('/', authMiddleware, createReporte);

export default router;