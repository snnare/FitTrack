import api from "./api";
import { Rutina } from "../types/rutinas";


interface RutinaParams {
  objetivo: Rutina['objetivo'];
  nivelExperiencia: Rutina['nivelExperiencia'];
  categoria?: Rutina['categoria']; 
}






export const getRutinas = async (params: RutinaParams): Promise<Rutina[]> => {
  try {
      const res = await api.get('/rutina', {
          params: {
              objetivo: params.objetivo,
              nivelExperiencia: params.nivelExperiencia,
              // Solo incluye la categoría si está definida
              ...(params.categoria && { categoria: params.categoria })
          }
      });
      return res.data;
  } catch (error) {
      console.error("Error al obtener rutinas recomendadas:", error);
      throw error; 
  }
};

export const getRutinaById = async (id: any) => {
  const res = await api.get(`/rutina/${id}`); 
  return res.data;
};
