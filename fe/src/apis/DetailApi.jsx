// /ets/stock/CKX24/news
import { etsInstance, testInstance } from "./BaseApi";

export async function buyStock(data) {
  try {
    const response = await testInstance.post(`/ets/stock/buy`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function sellStock(data) {
  try {
    const response = await testInstance.post(`/ets/stock/sell`, {
      stock_code: data.stock_code,
      price: data.price,
      quantity: data.quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCharts(stockCode) {
  try {
    const response = await testInstance.get(`/ets/stock/${stockCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getArticles(stockCode) {
  try {
    const response = await testInstance.get(`/ets/stock/${stockCode}/news`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
