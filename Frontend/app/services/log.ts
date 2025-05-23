import api from './api';


// userID es el correo del usuario
export const crearLog = async (logData: any) => {
  try{
    const response = await api.post('/logs', logData);
    return response.data;
  } catch (error) {
    console.error('Error creating log:', error);
    throw  error;
  }
};


export const getAllLogs = async () => {
  try {
    const res = await api.get('/logs');
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getLogById = async (id: string) => {
  try{
    const res = await api.get(`/logs/${id}`);
    return res.data;
  } catch (error: any){
    throw error.res?.data?.message;
  }
}


export const deleteLog = async (id: string) => {
  try {
    const res = await api.delete(`/logs/${id}`);
    return res;
  } catch (error: any) {
    throw error.response?.message || error;
  }
};




export const updateLog = async (id: string, logData: any) => {
  try {
    const res = await api.put(`/logs/${id}`, logData);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getCountLogs = async () => {
  try {
    const res = await api.get('/logs/count');
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}