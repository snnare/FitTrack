import { Router } from 'express';
import { 
    registerUser,
    loginUser,
    getUserProfile,
    getIMC,
    postRegisterUser,
} from '../controller/user.controller.js';
import {
    validateToken
} from '../controller/auth.controler.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

router.post('/register', registerUser); 
router.post('/postRegister', postRegisterUser); 
router.post('/login', loginUser);

router.post('/update', authMiddleware, getUserProfile); // Cambia el método a POST para actualizar el perfil

router.get('/validate', validateToken)       
router.get('/profile', authMiddleware, getUserProfile); 
router.get('/imc', authMiddleware, getIMC);



router.get('/test', (req, res) => {
    res.json({ message: 'Conexión exitosa desde el frontend' });
  });


export default router;
