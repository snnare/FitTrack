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


export const getMetricaForUser = async () => {
    try {
        const res = await api.get('/metrica/get');
        return res.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};
