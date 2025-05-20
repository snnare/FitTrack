import { Router } from 'express';
import { 
    registerUser,
    getInfo,
    getIMC,
    updateUser,
    deleteUser
} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerUser); 
router.put('/update', authMiddleware, updateUser);   
router.get('/profile', authMiddleware, getInfo); 
router.get('/imc', authMiddleware, getIMC);
router.delete('/delete', authMiddleware, deleteUser)
router.get('/test', (req, res) => {
    res.json({ message: 'Conexión exitosa desde el frontend' });
  });


export default router;
