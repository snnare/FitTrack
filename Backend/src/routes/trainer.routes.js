import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {findUserbyId, loginTrainer} from '../controller/trainer.controller.js';



const router = express.Router();

router.get('/', authMiddleware, findUserbyId); 
router.post('/login', loginTrainer);
export default router;