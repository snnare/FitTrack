import { Router } from 'express';
import { 
    registerUser,
    loginUser,
    getUserProfile,
} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);       
router.get('/profile', authMiddleware, getUserProfile); 


export default router;
