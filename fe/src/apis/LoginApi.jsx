import { loginInstance } from "./BaseApi";

export async function Login(userId, password) {
  try {
      const response = await loginInstance.post('/auth/sign-in', 
        {
          userId, 
          password
        },         
        {
          headers: {
            'Authorization': 'Bearer someRandomToken' // 임의의 값으로 Authorization 헤더 추가
          }
        }
      ); 
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}
