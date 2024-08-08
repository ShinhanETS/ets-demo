// /ets/stock/CKX24/news
import { accountInstance, etsInstance } from "./BaseApi";

export async function getDesc(stockCode) {
  try {
    const response = await etsInstance.get(`/stock/${stockCode}/desc`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function buyStock(data) {
  try {
    const response = await etsInstance.post(`/stock/buy`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function sellStock(data) {
  try {
    const response = await etsInstance.post(`/stock/sell`, {
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

export async function getSellQuantity(stockCode) {
  try {
    const response = await accountInstance.get(`/stock/sell/${stockCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCharts(stockCode) {
  try {
    const response = await etsInstance.get(`/stock/${stockCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getArticles(stockCode) {
  try {
    const response = await etsInstance.get(`/stock/${stockCode}/news`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
