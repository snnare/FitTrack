import { Router } from 'express';
import { loginUser } from '../controller/auth.controler.js';

const router = Router();
router.post('/login', loginUser);
router.get('/test', (req, res) => {
    res.json({ message: 'Conexión exitosa desde el frontend' });
});


export default router;