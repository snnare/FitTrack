import Log from '../models/Logs.js'; // Importar el modelo de Log




// Crear un nuevo log 
export const createLog = async (req, res) => {
    try {
        const { 
            ejercicio, 
            series, 
            repeticiones, 
            peso, 
            notas } = req.body;


        // Por defecto tiene timestamps: true, por lo que no es necesario agregar la fecha
        const nuevoLog = new Log({
            userId: 'demo@demo.com', 
            ejercicio,
            series,
            repeticiones,
            peso,
            notas,
        });

        await nuevoLog.save(); 

        res.status(201).json({
            message: 'Log creado exitosamente',
            data: nuevoLog,
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            message: 'Error al crear el log',
            error: error.message,
        });
    }
};

// Obtener todos los logs (rutinas) del usuario
export const getAllLogs = async (req, res) => {

};

// Actualizar un log (rutina) existente
export const updateLogs = async (req, res) => {
   
};

// Eliminar un log (rutina) existente
export const deleteAllLogs = async (req, res) => {
   
};



export const deleteOneLogs = async (req, res) => {
   
};