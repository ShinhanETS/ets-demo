import { loginInstance } from "./BaseApi";

export async function Login(token) {
  try {
    const response = await loginInstance.get('', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
