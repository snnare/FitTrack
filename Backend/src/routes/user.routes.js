import { Router } from 'express';
import { 
    registerUser,
    loginUser,
    getUserProfile,
    getIMC,
} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);       
router.get('/profile', authMiddleware, getUserProfile); 
router.get('/imc', authMiddleware, getIMC);


export default router;
