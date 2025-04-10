import api from "./api";

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error registering user");
  }
}