// services/reporte.ts
import api from "./api";

export const crearReporte = async (reporteData: any) => {
  try {
    const res = await api.post('/reportes', reporteData);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// identifica al usuario por el token.
export const getReportes = async (userId: string) => {
  try {
    const res = await api.get(`/reportes?userId=${userId}`); // Ejemplo de cómo podrías pasar el userId como query param
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Si necesitas obtener todos los reportes (con los permisos adecuados):
export const getAllReportes = async () => {
  try {
    const res = await api.get('/reportes');
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Si necesitas obtener un reporte por su ID:
export const getReporteById = async (id: string) => {
  try {
    const res = await api.get(`/reportes/${id}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};