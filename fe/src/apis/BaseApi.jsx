import axios from 'axios';

export const BASE_EX_URL = 'https://my-json-server.typicode.com';
export const BASE_URL = 'http://localhost/api';

export const exampleInstance = axios.create({
  baseURL: BASE_EX_URL + '/typicode/demo/db',
  withCredentials: true,
});

export const signupInstance = axios.create({
  baseURL: BASE_URL + '/accounts/test',
  withCredentials: true,
});
