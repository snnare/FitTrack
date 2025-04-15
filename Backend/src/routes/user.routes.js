import { Router } from 'express';
import { 
    registerUser,
    loginUser,
    getUserProfile,
    getIMC,
    postRegisterUser,
} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);       
router.get('/profile', authMiddleware, getUserProfile); 
router.get('/imc', authMiddleware, getIMC);
router.post('/postRegister', authMiddleware, postRegisterUser); // Cambia el nombre de la función a postRegister


export default router;
