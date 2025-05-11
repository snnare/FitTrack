import api from './api';

export const getInfoPersonal = async () => {
    try{
        const res = await api.get('/data/info-personal');
        return res.data;
    }catch(error: any) {
        throw error.response?.data || error;
    }
}


export const getHistorialMedidas = async () => { 
    try{
        const res = await api.get('/data/info-medidas');
        return res.data;
    } catch (error: any) {
        throw error.response.data || error;
    }
}


export const getHistorialLogs = async ()  => { 
    try{
        const res = await api.get('/data/info-logs');
        return res.data;
    } catch (error: any){
        throw error.response.data || error;
    }
}


export const getStreak = async () => { 
    try {
        const res = await api.get ('/data/info-streak');
        return res.data;
    } catch (error: any){
        throw error.response.data || error;
    }
}



