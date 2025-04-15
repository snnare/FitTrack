import { Router } from 'express';
import { 
    createUser,
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    logoutUser
} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);       


router.post('/logout', authMiddleware, logoutUser);
router.get('/profile', authMiddleware, getUserProfile); 
router.put('/profile', authMiddleware, updateUser);     

export default router;
