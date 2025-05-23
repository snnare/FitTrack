import api from './api';

export const getReporte = async (mes: any, anio: any) => {
    try{
        const res = await api.get('/reporte', {
            params: {
                mes,
                anio
            }
        });
        return res.data;
    } catch (error: any){
        throw error.response?.data || error;
    }
}

export const createReporte = async (mes: any, anio: any) => {
    try{
        const res = await api.post('/reporte', {mes, anio});
        return res.data;
    } catch(error: any){
        throw error.response?.data || error;
    }
}