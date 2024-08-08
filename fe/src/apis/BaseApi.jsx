import axios from 'axios';

export const BASE_EX_URL = 'https://my-json-server.typicode.com';
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const exampleInstance = axios.create({
  baseURL: BASE_EX_URL + '/typicode/demo/db',
  withCredentials: true,
});

export const loginInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const Instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});