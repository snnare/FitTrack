import Log from '../models/logs.model.js'; 


export const createLog = async (req, res) => {
    try {
        const { 
            ejercicio, 
            series, 
            repeticiones, 
            peso, 
            notas } = req.body;

        const userId = req.user.correo;
        const nuevoLog = new Log({
            userId, 
            ejercicio,
            series,
            repeticiones,
            peso,
            notas,
        });

        await nuevoLog.save(); 

        res.status(201).json({
            message: 'Log creado',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el log',
            error: error.message,
        });
    }
};

export const getAllLogs = async (req, res) => {
    try{
        const userId = req.user.correo;
        const logs = await Log.find({ userId });
        res.status(200).json({data: logs});
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener los logs',
            error: error.message,
        });
    }
};

export const getLogById = async (req, res) => {
    try {
        const logId = req.params.id; 
        const log = await Log.findById(logId);
        if (!log) {
            return res.status(404).json({ message: 'Log no encontrado' });
        }

        res.status(200).json({
            message: 'Log x Id',
            data: log,
        });
    } catch (error) {
        console.error('Error al obtener log:', error);
        res.status(500).json({
            message: 'Error al obtener log',
            error: error.message,
        });
    }
};

export const deleteLog = async (req, res) => {
    try {
        const logId = req.params.id; 
        const log = await Log.deleteOne({_id: logId});
        if (!log) {
            return res.status(404).json({ message: 'Log no encontrado' });
        }

        res.status(200).json({
            message: 'Log eliminado'
        });
    } catch (error) {
        console.error('Error al eliminar log:', error);
        res.status(500).json({
            message: 'Error al obtener log',
            error: error.message,
        });
    }
};





export const updateLog = async (req, res) => {
    try {
        const logId = req.params.id;
        const { ejercicio, series, repeticiones, peso, notas } = req.body;

        const updatedLog = await Log.findByIdAndUpdate(
            logId,
            { ejercicio, series, repeticiones, peso, notas },
            { new: true } 
        );

        if (!updatedLog) {
            return res.status(404).json({ message: 'Log no encontrado' });
        }

        res.status(200).json({
            message: 'Log actualizado',
        });
    } catch (error) {
        console.error('Error al actualizar log:', error);
        res.status(500).json({
            message: 'Error al actualizar log',
            error: error.message,
        });
    }
};


export const getCountLogs = async (req, res) => {
    try {
      const userId = req.user.correo;
      const count = await Log.countDocuments({ userId }); 
      res.status(200).json({ count }); 
    } catch (error) {
      console.log("CORREO", req.user.correo);
      console.log(error);
      res.status(500).json({
        message: 'Error al obtener el conteo de logs',
        error: error.message,
      });
    }
};