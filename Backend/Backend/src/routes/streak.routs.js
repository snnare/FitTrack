import express from 'express';
import { updateStreak, getStreak } from '../controllers/streakController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, updateStreak);
router.get('/', authMiddleware, getStreak);

export default router;