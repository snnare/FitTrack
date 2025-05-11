import User from '../models/User.js';
import Log from '../models/Logs.js';
import Medida from '../models/Medidas.js';
import Streak from '../models/Streak.js';
import mongoose from 'mongoose';

// Información personal básica
export const getInfoPersonal = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (user) {
            return {
                nombreCompleto: `${user.nombre} ${user.apellidos}`,
                correo: user.correo,
                fechaNacimiento: user.fechaNacimiento,
                genero: user.genero,
                peso: user.peso,
                estatura: user.estatura,
                objetivo: user.objetivo,
                nivel: user.nivelExperiencia,
            };
        }
        return null;
    } catch (error) {
        console.error('Error en getInfoPersonal:', error);
        return null;
    }
};

// Última medida registrada y evolución histórica
export const getHistorialMedidas = async (correo) => {
    try {
        const medidas = await Medida.find({ userId: correo }).sort({ fecha: 1 });
        return medidas;
    } catch (error) {
        console.error('Error en getHistorialMedidas:', error);
        return [];
    }
};

// Entrenamientos (logs) más recientes
export const getHistorialEntrenamientos = async (correo, limit = 30) => {
    try {
        const logs = await Log.find({ userId: correo }).sort({ fecha: -1 }).limit(limit);
        return logs.reverse(); // Devolver cronológicamente (más antiguos primero)
    } catch (error) {
        console.error('Error en getHistorialEntrenamientos:', error);
        return [];
    }
};

// Obtener la racha actual
export const getRachaActual = async (correo) => {
    try {
        const streak = await Streak.findOne({ userId: correo });
        if (!streak) return null;

        return {
            rachaActual: streak.currentStreak,
            ultimaFecha: streak.lastLogDate
        };
    } catch (error) {
        console.error('Error en getRachaActual:', error);
        return null;
    }
};

// Calcular edad desde la fecha de nacimiento
export const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
};
