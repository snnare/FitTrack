import { Router } from 'express';
import { createLog, getAllLogs, getCountLogs, updateLog } from '../controller/logs.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',authMiddleware, getAllLogs);
router.get('/count', authMiddleware, getCountLogs);
router.post('/',authMiddleware, createLog); 
router.put('/:id',authMiddleware, updateLog);


export default router;