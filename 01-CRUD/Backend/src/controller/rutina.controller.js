import Rutina from '../models/Rutina.js';
import User from '../models/User.js';



// userId es el correo

export const createRutina = async (req, res) => {
    try {
      const { fecha, ejercicio, series, repeticiones, peso, notas } = req.body;
  
      // Crear la bitácora
      const nuevaRutina = new Rutina({
        fecha,
        ejercicio,
        series,
        repeticiones,
        peso,
        notas,
      });
  
      await nuevaRutina.save();
  
      res.status(201).json({ message: 'Rutina registrada con éxito', rutina: nuevaRutina });
    } catch (error) {
      console.error('🔴 Error al crear la rutina:', error);
      res.status(500).json({ message: 'Error al crear la rutina', error: error.message });
    }
  };
  
  // Obtener todas las bitácoras de un usuario
  export const getRutinasByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const rutinas = await Rutina.find({ userId });
  
      if (!rutinas.length) {
        return res.status(404).json({ message: 'No se encontraron rutinas para este usuario' });
      }
  
      res.status(200).json(rutinas);
    } catch (error) {
      console.error('🔴 Error al obtener las rutinas:', error);
      res.status(500).json({ message: 'Error al obtener las rutinas', error: error.message });
    }
  };
  
  // Actualizar una bitácora de entrenamiento
  export const updateRutina = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, ...updateData } = req.body;
  
      const rutina = await Rutina.findById(id);
  
      if (!rutina) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
      }
  
      // Validar que la rutina pertenezca al usuario
      if (rutina.userId.toString() !== userId) {
        return res.status(403).json({ message: 'No tienes permisos para actualizar esta rutina' });
      }
  
      Object.assign(rutina, updateData);
      await rutina.save();
  
      res.status(200).json({ message: 'Rutina actualizada con éxito', rutina });
    } catch (error) {
      console.error('🔴 Error al actualizar la rutina:', error);
      res.status(500).json({ message: 'Error al actualizar la rutina', error: error.message });
    }
  };
  
  // Eliminar una bitácora de entrenamiento
  export const deleteRutina = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
  
      const rutina = await Rutina.findById(id);
  
      if (!rutina) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
      }
  
      // Validar que la rutina pertenezca al usuario
      if (rutina.userId.toString() !== userId) {
        return res.status(403).json({ message: 'No tienes permisos para eliminar esta rutina' });
      }
  
      await rutina.deleteOne();
  
      res.status(200).json({ message: 'Rutina eliminada con éxito' });
    } catch (error) {
      console.error('🔴 Error al eliminar la rutina:', error);
      res.status(500).json({ message: 'Error al eliminar la rutina', error: error.message });
    }
  };
  