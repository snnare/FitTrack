import { Router } from "express";
import {getRutinasRecomendadas, getRutinaById, getAllRutinas} from "../controller/rutina.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware,  getRutinasRecomendadas); 
// router.get('/all', authMiddleware, getAllRutinas)
router.get("/:id", authMiddleware, getRutinaById); 

export default router; 