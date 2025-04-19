// services/api.ts
import axios, {AxiosInstance} from 'axios';
import { API_URL, TOKEN_KEY } from './env';
import * as SecureStore from 'expo-secure-store';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al obtener el token para el interceptor:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


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