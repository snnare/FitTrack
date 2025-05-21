import Rutina from '../models/rutina.model.js';
import User from '../models/user.model.js';


export const getAllRutinas = async (req, res) => {
  try {
      // 1. Validar que el usuario esté autenticado
      if (!req.user || !req.user.correo) {
          return res.status(401).json({ message: 'No autorizado: Se requiere autenticación.' });
      }

      const correo = req.user.correo;

      // 2. Obtener el perfil del usuario para sus datos de objetivo y nivelExperiencia
      const usuario = await User.findOne({ correo });

      if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const objetivoUsuario = usuario.objetivo;
      const nivelUsuario = usuario.nivelExperiencia;

      // 3. Construir la consulta a la base de datos con los datos del usuario
      const query = {
          objetivo: objetivoUsuario,
          nivelExperiencia: nivelUsuario,
          // Aquí no se añade 'categoria', ya que queremos todas las que coincidan con objetivo y nivel
      };

      console.log("Filtros de búsqueda aplicados (getAllRutinas):", query);

      // 4. Buscar las rutinas que coincidan con el objetivo y nivel del usuario
      const rutinas = await Rutina.find(query);

      console.log("Rutinas encontradas (getAllRutinas):", rutinas.length);

      res.status(200).json(rutinas);

  } catch (error) {
      console.error("Error en getAllRutinas:", error); // Log más detallado del error
      res.status(500).json({ message: 'Error al obtener todas las rutinas del usuario.', error: error.message });
  }
};


export const getRutinasRecomendadas = async (req, res) => {
  try {
    const objetivoF = req.query.objetivo;
    const nivelExperienciaF = req.query.nivelExperiencia;
    const categoriaF = req.query.categoria;


    const objetivosPermitidos = ["Ganar peso", "Perder peso", "Definir", "Mantener"];
    const nivelesPermitidos = ["Principiante", "Intermedio", "Avanzado"];
    const categoriasPermitidas = ["Pecho", "Espalda", "Piernas", "Glúteos", "Brazos", "Hombro", "Abs", "Full Body"];


    if (!objetivoF || !objetivosPermitidos.includes(objetivoF)) {
      return res.status(400).json({ message: 'Objetivo no válido o ausente. Valores permitidos: ' + objetivosPermitidos.join(', ') });
    }
    if (!nivelExperienciaF || !nivelesPermitidos.includes(nivelExperienciaF)) {
      return res.status(400).json({ message: 'Nivel de experiencia no válido o ausente. Valores permitidos: ' + nivelesPermitidos.join(', ') });
    }
    // La categoría es opcional, así que solo validamos si está presente
    if (categoriaF && !categoriasPermitidas.includes(categoriaF)) {
      return res.status(400).json({ message: 'Categoría no válida. Valores permitidos: ' + categoriasPermitidas.join(', ') });
    }

    const query  = {
      objetivo: objetivoF,
      nivelExperiencia: nivelExperienciaF,
    };
    if (categoriaF) {
      query.categoria = categoriaF;
    }
    console.log("Filtros de búsqueda aplicados:", query);

    const rutinas = await Rutina.find(query);

    console.log("Rutinas encontradas:", rutinas.length);

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
