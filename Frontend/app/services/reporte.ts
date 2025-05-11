import api from './api';

export const getReporte = async (mes: number, anio: number) => {
    try{
        const res = await api.post('/reporte',{ mes, anio } );
        return res.data;
    } catch (error: any){
        throw error.response?.data || error;
    }
}