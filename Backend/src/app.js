import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import {connectDB} from './utils/db.js';

// Usuarios
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import trainerRoutes from './routes/trainer.routes.js';

// Acciones
import logsRoutes from './routes/logs.routes.js';
import streakRoutes from './routes/streak.routes.js';
import rutinaRoutes from './routes/rutina.routes.js';
import metricaRoutes from './routes/metrica.routes.js';
import dataRotues from './routes/data.routes.js';
import reportRoutes from './routes/reporte.routes.js';

dotenv.config();

const app = express ();
const port = process.env.PORT  || 4000;

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Usuarios normales
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/trainer', trainerRoutes);
// Rutas protegidas
app.use('/logs', logsRoutes);
app.use('/streak', streakRoutes);
app.use('/metrica',metricaRoutes);


app.use('/data', dataRotues);
app.use('/reporte', reportRoutes);
app.use('/rutina', rutinaRoutes);



app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


