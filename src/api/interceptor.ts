/* eslint-disable no-alert */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { PATH } from '@/constants/path';
import { ERROR, NOTICE } from '@/constants/message';
import store from '@/store';
import { ServerResponse } from '@/types/api';
import { tokenActions } from '@/store/auth';
import { AXIOS, END_POINT, HTTP_STATUS_CODE } from '../constants/api';
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

export const axiosRefreshInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: AXIOS.TIMEOUT,
});

export const getRefreshToken = async () => {
  const { data } = await axiosRefreshInstance.get<ServerResponse>(
    `${END_POINT.REFRESH}`,
  );
  return data;
};

// request interceptor (before request)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers.Authorization) return config;

    const newConfig = { ...config };
    const { accessToken } = store.getState().token;

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
  async (error: AxiosError<AxiosErrorResponse>) => {
    const originalRequest = error.config;
    if (!error.response || !originalRequest) throw error;

    const { data, status } = error.response;

    if (
      status === HTTP_STATUS_CODE.UNAUTHORIZED &&
      data.message !== ERROR.LOGIN.NOT_MATCH
    ) {
      try {
        const newAccessToken = await getRefreshToken();

        store.dispatch(tokenActions.setToken(newAccessToken));
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return await axiosInstance(originalRequest);
      } catch (err) {
        delete axiosInstance.defaults.headers.Authorization;
        store.dispatch(tokenActions.deleteToken());

        alert(NOTICE.LOGIN.EXPIRED);
        window.location.href = `/${PATH.LOGIN}`;

        return Promise.reject(err);
      }
    }

    throw new HTTPError(status, data.httpStatus, data.message);
  },
);
