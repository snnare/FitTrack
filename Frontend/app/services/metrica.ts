import api from './api';



export const registerMetrica = async (metricaData: any) => {
    try {
        const res = await api.post('/metrica', metricaData);
        return res.data;
    } catch (error) {
        console.error('Error creating log:', error);
        throw error;
    }
}




export const getMonthlyMetricas = async (month: number, year: number) => {
    try {
        const res = await api.get('/metrica/monthly', {
            params: {
                month,
                year
            }
        });
        return res.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};




export const getAllUserMetricas = async () => {
    try {
        const res = await api.get('/metrica');
        return res.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};
