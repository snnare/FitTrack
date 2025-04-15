import api from './api';

export const crearLog = async (logData: any) => {
  const res = await api.post('/logs', logData);
  return res.data;
};

export const getLogFromUser = async (userId: string) => {
  const res = await api.get(`/logs/${userId}`);
  return res.data;
};
