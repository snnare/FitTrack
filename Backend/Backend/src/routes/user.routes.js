import { Router } from 'express';
import { 
    createUser,
    loginUser,
    getUserProfile,
    updateUser,
    logoutUser
} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



const router = Router();

// Rutas públicas (no requieren autenticación)
router.post('/register', createUser); // Registro de usuario
router.post('/login', loginUser);       // Inicio de sesión
// Ruta pública para logout (aunque normalmente se protege en el cliente)
router.post('/logout', authMiddleware, logoutUser);
// Rutas protegidas (requieren autenticación)
router.get('/profile', authMiddleware, getUserProfile); // Obtener perfil
router.put('/profile', authMiddleware, updateUser);     // Actualizar perfil

export default router;
