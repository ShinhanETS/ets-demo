import { accountInstance } from "./BaseApi";


// 예수금
export async function fetchMyAccount()  { 
  try {
    const response = await accountInstance.get('/')
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
}

// 예수금 총합
export async function fetchMyBudget()  { 
  try {
      const response = await accountInstance.get('/total')
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}

// 보유종목
export async function fetchMyProduct(index)  {  // ets 거래권, etf , etn, futures
  const indexToURL = {
    0: 'ets',
    1: 'etf',
    2: 'etn',
    3: 'futures'
  }
  try {
      const response = await accountInstance.get(`/holdings/${indexToURL[index]}`)
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}