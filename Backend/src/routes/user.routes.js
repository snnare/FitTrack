import { Router } from 'express';
import { 
    registerUser,
    loginUser,
    getUserProfile,
    getIMC,
    postRegisterUser,
    getProfileInfo,
    getProfileStatus
} from '../controller/user.controller.js';
import {
    validateToken
} from '../controller/auth.controler.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);
router.get('/validate', validateToken)       
router.post('/postRegister', authMiddleware, postRegisterUser); 
router.get('/profile', authMiddleware, getUserProfile); 
router.get('/profileStatus', authMiddleware, getProfileStatus);
router.get('/imc', authMiddleware, getIMC);



router.get('/test', (req, res) => {
    res.json({ message: 'Conexión exitosa desde el frontend' });
  });


export default router;
