import api from "./api";
import { LoginAndRegisterData } from "../types/auth";



export const registerUser = async (userData: any) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error registering user");
  }
}

export const loginUser = async (userData: LoginAndRegisterData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error logging in user");
  }
}



export const validateToken = async (token: string) => {
  try {
    const response = await api.get("/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error validating token");
  }
}
