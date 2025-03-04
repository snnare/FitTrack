import express from 'express'
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose'

import {connectDB} from './config/db.js';
import userRoutes from './routes/user.routes.js';
import rutinaRoutes from './routes/rutina.routes.js'
import reporteRoutes from './routes/reporte.routes.js';


dotenv.config();
const app = express ();
const port = process.env.PORT  || 4000;

// DB
connectDB();

// Middleware
app.use(express.json());
app.use('/users', userRoutes);
app.use('/rutinas',rutinaRoutes)
app.use('/reporte', reporteRoutes);

app.listen(port, () => {
    console.log("Server OK")
})