// src/config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Máximo de conexiones en el pool
      minPoolSize: 5,  // Mínimo de conexiones activas
    });

    console.log('🟢 MongoDB conectado con pool de conexiones');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza la app si falla la conexión
  }
};
