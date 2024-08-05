import axios from 'axios';

export const BASE_URL = 'https://my-json-server.typicode.com';

export const userInstance = axios.create({
  baseURL: BASE_URL + '/typicode/demo/db',
  withCredentials: true,
});

// 아래에 인스턴스 추가 작성 후, 새로운 파일에서 가져다 쓰기