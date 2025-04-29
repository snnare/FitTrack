import Rutina from '../models/Rutina.js';
import User from '../models/User.js';

export const getRutinasRecomendadas = async (req, res) => {
    try {
        const correo = req.user.correo; 

        const usuario = await User.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const objetivo = usuario.objetivo;
        const nivelExperiencia = usuario.nivelExperiencia;

        const rutinas = await Rutina.find({ objetivo, nivelExperiencia });

        res.status(200).json(rutinas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rutinas recomendadas', error: error.message });
    }
};


