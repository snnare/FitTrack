import Rutina from '../models/rutina.model.js';
import User from '../models/user.model.js';

export const getRutinasRecomendadas = async (req, res) => {
    try {
        const correo = req.user.correo;

        const usuario = await User.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const objetivo = usuario.objetivo;
        const nivelExperiencia = usuario.nivelExperiencia;
        const categoria = req.query.categoria; // Obtiene la categoría del query parameter

        let filtro = { objetivo, nivelExperiencia }; // Filtro base

        if (categoria) {
            filtro = { ...filtro, categoria }; // Agrega la categoría al filtro si se proporciona
        }

        const rutinas = await Rutina.find(filtro);

        res.status(200).json(rutinas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rutinas recomendadas', error: error.message });
    }
};

export const getRutinaById = async (req, res) => {
    try {
      const rutinaId = req.params.id;
  
      const rutina = await Rutina.findById(rutinaId);
  
      if (!rutina) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
      }
  
      res.status(200).json(rutina);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la rutina', error: error.message });
    }
  };
  