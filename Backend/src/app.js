import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import {connectDB} from './utils/db.js';

// Usuarios
import userRoutes from './routes/user.routes.js';
import trainerRoutes from './routes/trainer.routes.js';

// Acciones
import logsRoutes from './routes/logs.routes.js';
import reporteRoutes from './routes/reporte.routes.js';
import streakRoutes from './routes/streak.routes.js';
import rutinaRoutes from './routes/rutina.routes.js';
import medidaRoutes from './routes/medidas.routes.js';
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
app.use('/auth', userRoutes);
// Usuarios entrenadores
app.use('/trainer', trainerRoutes);
// Rutas protegidas
app.use('/logs', logsRoutes);

app.use('/get-reporte', express.static('public/reports'));
app.use('/reporte', reporteRoutes)

app.use('/streak', streakRoutes);
app.use('/rutina', rutinaRoutes);
app.use('/medidas',medidaRoutes)

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


