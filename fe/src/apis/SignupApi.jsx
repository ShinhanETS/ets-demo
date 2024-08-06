import { signupInstance } from "./BaseApi";

export async function SignUp(userId, password) {
  try {
    const response = await signupInstance.post('', { 
      userId: userId,
      password: password
    }); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
