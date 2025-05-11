import { Router } from 'express';
import { crearMedida, obtenerMedidas} from '../controller/medidas.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();


router.post('/', authMiddleware, crearMedida);
router.get('/', authMiddleware, obtenerMedidas);

export default router;