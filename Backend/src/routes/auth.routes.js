import { Router } from 'express';
import { loginUser } from '../controller/auth.controler.js';

const router = Router();
router.post('/login', loginUser);
export default router;