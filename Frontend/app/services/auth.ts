import api from "./api";



export const loginUser = async (userData: any) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error logging in user");
  }
}


