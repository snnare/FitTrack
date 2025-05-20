import api from "./api";

export const registerUser = async(userData: any) => {
    try{
      const response = await api.post("/user/register", userData);
      return response.data;
    } catch (error) {
      throw new Error("Error registering user with token");
    }
  }
  
  
  export const updateUser = async (userData: any) => {
    try {
      const response = await api.put("/user/update", userData);
      return response.data;
    } catch (error) {
      throw new Error("Error updating user data");
    }
  }
  
  export const getProfileUser = async () => {
    try{
      const response = await api.get(`/user/profile`);
      return response.data;
    }catch (error){
      throw new Error("Error getting user profile");
    }
  }
  
  
  
  export const getIMC = async (token: string) => {
    try{
      const response = await api.get(`/user/imc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }catch(error){
      throw new Error("Error getting IMC data");
    }
  }