import { siseInstance } from "./BaseApi";

export async function fetchMyProducts()  { 
  try {
      const response = await siseInstance.get('')
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}

export async function fetchMyBudget()  { 
  try {
      const response = await siseInstance.get('')
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}
