import axios from 'axios';

export const BASE_URL = '/api';

// 로그인 인스턴스
export const loginInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 멤버쉽 인스턴스
export const membershipInstance = axios.create({
  baseURL: `${BASE_URL}/membership`,
  withCredentials: true,
});

// ets 인스턴스
export const estInstance = axios.create({
  baseURL: `${BASE_URL}/ets`,
  withCredentials: true,
});

// 인터셉터로 토큰 넣어주기 (로그인 제외 다 해줘야함)
membershipInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인터셉터로 토큰 넣어주기 (로그인 제외 다 해줘야함)
estInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
