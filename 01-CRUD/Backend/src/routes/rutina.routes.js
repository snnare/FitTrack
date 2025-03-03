import { Router } from 'express';
import {
    createRutina,
    getRutinasByUser,
    updateRutina,
    deleteRutina
} from '../controller/rutina.controller.js';
const router = Router();

// Crear una nueva bitácora (requiere autenticación)
router.post('/', createRutina);

// Obtener todas las bitácoras del usuario autenticado
router.get('/', getRutinasByUser);

// Actualizar una bitácora (solo el dueño puede hacerlo)
router.put('/:rutinaId', updateRutina);

// Eliminar una bitácora (solo el dueño puede hacerlo)
router.delete('/:rutinaId', deleteRutina);

export default router;
