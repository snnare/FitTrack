import { Router } from 'express';
import { createLog, getAllLogs, getCountLogs, getLogById, updateLog } from '../controller/logs.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/',authMiddleware, createLog); 
router.get('/:id', authMiddleware, getLogById);
router.get('/',authMiddleware, getAllLogs);
router.get('/count', authMiddleware, getCountLogs);
router.put('/:id',authMiddleware, updateLog);

export default router;