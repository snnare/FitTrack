import Streak from '../models/streak.model.js';
import moment from 'moment';

export const updateStreak = async (req, res) => {
    try {
        const correo = req.user.correo; 

        const hoy = moment().startOf('day');
        const ayer = moment().subtract(1, 'days').startOf('day');

        let streak = await Streak.findOneAndUpdate(
            { userId: correo }, 
            { userId: correo }, 
            { upsert: true, new: true } 
        );

        if (streak.lastLogDate) {
            const ultimaFechaLog = moment(streak.lastLogDate).startOf('day');

            if (ultimaFechaLog.isSame(hoy)) {
                // El usuario ya registró un log hoy
                return res.status(200).json(streak);
            } else if (ultimaFechaLog.isSame(ayer)) {
                // El usuario registró un log ayer
                streak.currentStreak += 1;
            } else {
                // El usuario no registró un log ayer
                streak.currentStreak = 1;
            }
        } else {
            // Es el primer log del usuario
            streak.currentStreak = 1;
        }

        streak.lastLogDate = hoy.toDate();
        await streak.save();

        res.status(200).json(streak);
    } catch (error) {
        console.error('Error al actualizar la racha:', error);
        res.status(500).json({ message: 'Error al actualizar la racha', error: error.message });
    }
};

export const getStreak = async (req, res) => {
    try {
        const correo = req.user.correo;

        const streak = await Streak.findOne({ userId: correo });

        if (!streak) {
            return res.status(404).json({ message: 'Racha no encontrada' });
        }

        res.status(200).json({ currentStreak: streak.currentStreak }); 
    } catch (error) {
        console.error('Error al obtener la racha:', error);
        res.status(500).json({ message: 'Error al obtener la racha', error: error.message });
    }
};


