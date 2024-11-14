import store from '@/store';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AXIOS, END_POINT } from '../constants/api';
import { HTTPError } from './HttpError';

export interface AxiosErrorResponse {
  status: number;
  httpStatus?: string;
  message?: string;
}

const baseURL =
  process.env.NODE_ENV === 'production' ? process.env.API_URL : '/api';

export const axiosInstance = axios.create({
  // baseURL: process.env.API_URL,
  // baseURL: '/api',
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: AXIOS.TIMEOUT,
});

// request interceptor (before request)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers.Authorization) return config;

    const { accessToken } = store.getState().token;
    const newConfig = { ...config };

    if (newConfig.url === END_POINT.FILE_UPLOAD) {
      newConfig.headers['Content-Type'] = 'multipart/form-data';
    }
    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    // console.log('요청 전 config', newConfig);
    return newConfig;
  },
  (error: AxiosError<AxiosErrorResponse>) => {
    // console.log('요청 전 config 에러');

    return Promise.reject(error);
  },
);

// response interceptor (after request)
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('요청 후 response');
    return response;
  },
  (error: AxiosError<AxiosErrorResponse>) => {
    // console.log('요청 후 response 에러');
    const originalRequest = error.config;
    if (!error.response || !originalRequest) throw error;

    const { data, status } = error.response;
    // const refreshToken = localStorage.getItem('rtk');

    // if (refreshToken) {
    //   if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    //     const accessToken = getRefreshToken();
    //     console.log('new accessToken: ', accessToken);
    //     localStorage.setItem('accessToken', accessToken);
    //     store.dispatch({ type: 'token/setAccessToken', payload: accessToken });
    //     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    //     return axiosInstance(originalRequest);
    //     console.log('토큰 재발급');
    //   }
    //   if (status === HTTP_STATUS_CODE.BAD_REQUEST) {
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('rtk');
    //     window.location.href = '/';
    //   }
    // }
    throw new HTTPError(status, data.httpStatus, data.message);
  },
);
