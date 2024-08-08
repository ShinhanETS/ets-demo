import { exampleInstance } from "./BaseApi";

export async function getData() {
  try {
    const response = await exampleInstance.get();
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
