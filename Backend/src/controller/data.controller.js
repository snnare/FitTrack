import User from '../models/user.model.js';
import Log from '../models/logs.model.js';
import Medida from '../models/medida.model.js';
import Streak from '../models/streak.model.js';


export const verificaRquisitos  = async (req, res) => {
    try {
        const correo = req.user.correo;       
    } catch (error) {
        
    }
}





export const getInfoPersonal = async (req, res) => {
    try {
        const userId = req.user.correo;
        const userInfo = await User.findOne({ correo: userId }).select('-password');
        res.status(200).json({
            message: 'OK',
            data: userInfo
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
}

export const getHistorialMedidas = async (req, res) => {
    try {
        const correo = req.user.correo;
        const medidas = await Medida.find({ userId: correo }).sort({ fecha: 1 });
        res.status(200).json({
            message: 'OK',
            data: medidas
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
}

export const getHistorialEntrenamientos = async(req, res) => {
    try {
        const correo = req.user.correo;
        const logs = await Log.find({userId: correo}).sort({fecha: -1}).limit(30);
        res.status(200).json({
            message: 'OK',
            data: logs
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
}


export const getRachaActual = async (req, res) => {
    try {
        const correo = req.user.correo;
        const streak = await Streak.findOne({userId: correo});
        res.status(200).json({
            message: 'OK',
            data: streak
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error: error.message,
        });
    }
}



