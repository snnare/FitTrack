import { Router } from 'express';
import { createLog, getAllLogs, getLogById, updateLog } from '../controller/logs.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',authMiddleware, getAllLogs);
router.get('/:id',authMiddleware, getLogById); 
router.post('/',authMiddleware, createLog); 
router.put('/:id',authMiddleware, updateLog);


export default router;