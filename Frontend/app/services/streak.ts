import api from "./api";

export const updateStreak = async () => {
    try {
        const response = await api.post('/streak');
        return response.data;
    } catch (error: any) {
        console.error('Error al actualizar la racha:', error);
        throw error;
    }
};

export const getStreak = async () => {
    try {
        const response = await api.get('/streak');
        return response.data;
    } catch (error: any) {
        console.error('Error al obtener la racha:', error);
        throw error;
    }
};