import { Router } from 'express';
import { createLog, deleteLog, getAllLogs, getCountLogs, getLogById, updateLog } from '../controller/logs.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/',authMiddleware, createLog);
router.get('/count', authMiddleware, getCountLogs);
router.get('/:id', authMiddleware, getLogById);
router.get('/',authMiddleware, getAllLogs);
router.put('/:id',authMiddleware, updateLog);
router.delete('/:id', authMiddleware, deleteLog);
export default router;