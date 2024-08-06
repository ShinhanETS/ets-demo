import { loginInstance } from "./BaseApi";

export async function Login(userId, password) {
  try {
      const response = await loginInstance.post('/auth/sign-in', 
        {
          userId, 
          password
        },         
      ); 
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}
