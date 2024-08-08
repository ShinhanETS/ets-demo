import axios from "axios";

export const BASE_URL = "/api";
export const REAL_URL = "/real";
export const TEST_URL = "/test";

// 로그인 인스턴스
export const loginInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// // ets 인스턴스
// export const etsInstance = axios.create({
//   baseURL: REAL_URL,
//   withCredentials: true,
// });

// // ets 매수/매도 임시 인스턴스
// export const testInstance = axios.create({
//   baseURL: TEST_URL,
//   withCredentials: true,
// });

// 멤버쉽 인스턴스
export const membershipInstance = axios.create({
  baseURL: `${BASE_URL}/membership`,
  withCredentials: true,
});

// ets 인스턴스
export const etsInstance = axios.create({
  baseURL: `${BASE_URL}/ets`,
  withCredentials: true,
});

// 시세 인스턴스
export const siseInstance = axios.create({
  baseURL: `${BASE_URL}/sise`,
  withCredentials: true,
});

// 인터셉터로 토큰 넣어주기 (로그인 제외 다 해줘야함)
membershipInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인터셉터로 토큰 넣어주기 (로그인 제외 다 해줘야함)
etsInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인터셉터로 토큰 넣어주기 (로그인 제외 다 해줘야함)
siseInstance.interceptors.request.use(
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