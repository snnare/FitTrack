import Streak from '../models/Streak.js';
import moment from 'moment';

export const updateStreak = async (req, res) => {
  try {
    const { userId } = req.user; // Asumiendo que tienes el userId en req.user desde el middleware de autenticación

    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    let streak = await Streak.findOne({ userId });

    if (!streak) {
      // Si el usuario no tiene una racha, crear una nueva
      streak = new Streak({ userId });
    }

    if (streak.lastLogDate) {
      const lastLogDate = moment(streak.lastLogDate).startOf('day');

      if (lastLogDate.isSame(today)) {
        // El usuario ya registró un log hoy, no hacer nada
        return res.status(200).json(streak);
      } else if (lastLogDate.isSame(yesterday)) {
        // El usuario registró un log ayer, incrementar la racha
        streak.currentStreak += 1;
      } else {
        // El usuario no registró un log ayer, reiniciar la racha
        streak.currentStreak = 1;
      }
    } else {
      // Es el primer log del usuario, iniciar la racha
      streak.currentStreak = 1;
    }

    streak.lastLogDate = today.toDate();
    await streak.save();

    res.status(200).json(streak);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const getStreak = async (req, res) => {
  try {
    const { userId } = req.user;

    const streak = await Streak.findOne({ userId });

    if (!streak) {
      return res.status(404).json({ message: 'Streak not found' });
    }

    res.status(200).json(streak);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};