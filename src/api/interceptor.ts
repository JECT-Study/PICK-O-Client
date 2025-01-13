/* eslint-disable no-alert */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { PATH } from '@/constants/path';
import { NOTICE } from '@/constants/message';
import { ServerResponse } from '@/types/api';
import store from '@/store';
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

// 재발급 함수 실행 이후 response.use 실행 방지를 위한 선언
export const axiosRefreshInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 값 전달
  timeout: AXIOS.TIMEOUT,
});

// 쿠키의 리프레시 토큰을 사용한 새 토큰 재발급 함수 (순환 참조 방지)
export const getRefreshToken = async () => {
  const { data } = await axiosRefreshInstance.get<ServerResponse>(
    `${END_POINT.REFRESH}`,
  );
  return data;
};

// request interceptor (before request)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 헤더에 토큰이 이미 있으면 바로 리턴 (토큰 재발급 시 바로 헤더에 넣어주는 로직 필수)
    if (config.headers.Authorization) return config;

    const newConfig = { ...config };
    const { accessToken } = store.getState().token;

    // 리덕스에 토큰이 존재
    if (accessToken) {
      // 헤더에 토큰을 담아 api 요청 수행
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
    // api 요청 성공 시 그대로 반환
    return response;
  },
  async (error: AxiosError<AxiosErrorResponse>) => {
    const originalRequest = error.config;
    if (!error.response || !originalRequest) throw error;

    const { data, status } = error.response;

    // 액세스 토큰 만료로 401 에러
    if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      try {
        // 쿠키에 리프레시 토큰을 담아 액세스 토큰 재발급
        const newAccessToken = await getRefreshToken();

        // 리덕스에 새 액세스 토큰 업데이트
        store.dispatch(tokenActions.setToken(newAccessToken));

        // 재발급한 토큰을 원본 요청의 헤더에 담음
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 로컬 스토리지에 로그인 상태 업데이트
        localStorage.setItem('isLoggedIn', 'true');

        // 새 토큰으로 api 요청 재시도
        return await axiosInstance(originalRequest);
      } catch (err) {
        // 서버에서 리프레시 토큰 유효성 검사 실패
        // 토큰 재발급 실패 시 로그아웃 처리 - 헤더와 리덕스에서 토큰 제거
        delete axiosInstance.defaults.headers.Authorization;
        store.dispatch(tokenActions.deleteToken());

        // 로컬 스토리지에 로그인 여부 제거
        localStorage.removeItem('isLoggedIn');

        // 로그아웃 후 로그인 페이지로 이동
        alert(NOTICE.LOGIN.EXPIRED);
        window.location.href = `/${PATH.LOGIN}`;

        return Promise.reject(err);
      }
    }

    throw new HTTPError(status, data.httpStatus, data.message);
  },
);
