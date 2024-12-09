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

    return newConfig;
  },
  (error: AxiosError<AxiosErrorResponse>) => {
    return Promise.reject(error);
  },
);

// response interceptor (after request)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<AxiosErrorResponse>) => {
    const originalRequest = error.config;
    if (!error.response || !originalRequest) throw error;

    const { data, status } = error.response;
    throw new HTTPError(status, data.httpStatus, data.message);
  },
);
