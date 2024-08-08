import { siseInstance } from "./BaseApi";

export async function fetchProductList()  { 
  try {
      const response = await siseInstance.get('')
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}
