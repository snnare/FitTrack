import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {connectDB} from './config/db.js';
import userRoutes from './routes/user.routes.js';



dotenv.config();

const app = express ();
const port = process.env.PORT  || 4000;

// DB
connectDB();

// Middleware
//app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log("Server OK")
})