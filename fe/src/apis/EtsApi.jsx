import { estInstance } from "./BaseApi";

export async function fetchProductList(domestic, productType)  { // domestic - 0: 국내, 1: 해외    productType - CERs ETF ETN FUTURE (배출권 ETF, ETN, 선물)
  try {
      const response = await estInstance.get(`/${domestic}/${productType}`)
      return response.data; 
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
  }
}
