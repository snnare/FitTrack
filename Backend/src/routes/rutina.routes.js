import { Router } from "express";
import {getRutinasRecomendadas} from "../controller/rutina.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware,  getRutinasRecomendadas); 

export default router; 