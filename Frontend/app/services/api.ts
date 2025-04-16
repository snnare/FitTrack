// services/api.ts
import axios from 'axios';
import { API_URL } from './env';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testConnection = async () => {
  try {
    const response = await api.get('/auth/test'); // Ruta de prueba en el backend
    console.log('Conexión de prueba exitosa:', response.data);
    return true; // Indica que la conexión fue exitosa
  } catch (error) {
    console.error('Error en la conexión de prueba:', error);
    return false; // Indica que la conexión falló
  }
};

export default api;