import api from "./api";

export const getRutinas = async () => {
  const res = await api.get('/rutina');
  return res.data;
};

export const getRutinaById = async (id: any) => {
  const res = await api.get(`/rutina/${id}`); 
  return res.data;
};
