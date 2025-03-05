import Log from '../models/Log.js'; // Importar el modelo de Log
import jwt from 'jsonwebtoken'; // Para decodificar el JWT

// Función para obtener el correo del usuario desde el JWT
const obtenerCorreoDesdeToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodificar el token
    return decoded.correo; // Asumimos que el correo está en el payload del JWT
};

// Crear un nuevo log (rutina)
export const crearLog = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del header
        const correo = obtenerCorreoDesdeToken(token); // Obtener el correo del usuario

        const { ejercicio, series, repeticiones, peso, notas } = req.body;

        const nuevoLog = new Log({
            userId: correo, // Usar el correo como userId
            ejercicio,
            series,
            repeticiones,
            peso,
            notas,
        });

        await nuevoLog.save(); // Guardar el log en la base de datos

        res.status(201).json({
            success: true,
            message: 'Log creado exitosamente',
            data: nuevoLog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el log',
            error: error.message,
        });
    }
};

// Obtener todos los logs (rutinas) del usuario
export const obtenerLogs = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del header
        const correo = obtenerCorreoDesdeToken(token); // Obtener el correo del usuario

        const logs = await Log.find({ userId: correo }); // Buscar los logs del usuario

        res.status(200).json({
            success: true,
            data: logs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los logs',
            error: error.message,
        });
    }
};

// Actualizar un log (rutina) existente
export const actualizarLog = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del header
        const correo = obtenerCorreoDesdeToken(token); // Obtener el correo del usuario

        const { id } = req.params; // ID del log a actualizar
        const { ejercicio, series, repeticiones, peso, notas } = req.body;

        // Verificar que el log pertenezca al usuario
        const log = await Log.findOne({ _id: id, userId: correo });
        if (!log) {
            return res.status(404).json({
                success: false,
                message: 'Log no encontrado o no tienes permisos para actualizarlo',
            });
        }

        // Actualizar el log
        log.ejercicio = ejercicio || log.ejercicio;
        log.series = series || log.series;
        log.repeticiones = repeticiones || log.repeticiones;
        log.peso = peso || log.peso;
        log.notas = notas || log.notas;

        await log.save(); // Guardar los cambios

        res.status(200).json({
            success: true,
            message: 'Log actualizado exitosamente',
            data: log,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el log',
            error: error.message,
        });
    }
};

// Eliminar un log (rutina) existente
export const eliminarLog = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del header
        const correo = obtenerCorreoDesdeToken(token); // Obtener el correo del usuario

        const { id } = req.params; // ID del log a eliminar

        // Verificar que el log pertenezca al usuario
        const log = await Log.findOne({ _id: id, userId: correo });
        if (!log) {
            return res.status(404).json({
                success: false,
                message: 'Log no encontrado o no tienes permisos para eliminarlo',
            });
        }

        await Log.findByIdAndDelete(id); // Eliminar el log

        res.status(200).json({
            success: true,
            message: 'Log eliminado exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el log',
            error: error.message,
        });
    }
};