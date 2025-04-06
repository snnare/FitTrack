import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {connectDB} from './config/db.js';
import userRoutes from './routes/user.routes.js';
import logsRoutes from './routes/logs.routes.js';
import reporteRoutes from './routes/reporte.routes.js';



dotenv.config();

const app = express ();
const port = process.env.PORT  || 4000;

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/logs', logsRoutes);
app.use('/reporte', reporteRoutes);


app.listen(port, () => {
    console.log("Server OK")
})