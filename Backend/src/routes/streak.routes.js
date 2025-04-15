import express from 'express';
import { updateStreak, getStreak } from '../controller/streak.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, updateStreak);
router.get('/', authMiddleware, getStreak);

export default router;