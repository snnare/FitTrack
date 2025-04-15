import { Router } from 'express';
import { createLog } from '../controller/logs.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/createlog',authMiddleware, createLog); // Crear un nuevo log (ejercicio)

export default router;