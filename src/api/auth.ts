import { AXIOS, END_POINT } from '@/constants/api';
import { ServerResponse } from '@/types/api';
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ? process.env.API_URL : '/api';

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
