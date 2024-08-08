import { membershipInstance } from "./BaseApi";

// 멤버쉽 조회
export async function fetchMembership() {
  try {
    const response = await membershipInstance.get("/my");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
