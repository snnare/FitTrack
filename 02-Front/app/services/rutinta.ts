import api from "./api";

export const getRutinas = async () => {
  const res = await api.get('/rutinas');
  return res.data;
};

export const getRutinaById = async (id: string) => {
  const res = await api.get(`/rutinas/${id}`);
  return res.data;
};
