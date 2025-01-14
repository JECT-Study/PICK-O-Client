/* eslint-disable no-console */
import { axiosInstance } from '@/api/interceptor';
import { getRefreshToken } from '@/api/auth';
import store, { useNewDispatch, useNewSelector } from '@/store';
import { selectAccessToken, tokenActions } from '@/store/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTokenRefresh = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();

  const accessToken = useNewSelector(selectAccessToken);

  useEffect(() => {
    const tokenRefresh = async () => {
      if (accessToken) return;

      try {
        const newAccessToken = await getRefreshToken();

        dispatch(tokenActions.setToken(newAccessToken));
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        store.dispatch(tokenActions.deleteToken());
        delete axiosInstance.defaults.headers.Authorization;
      }
    };
    tokenRefresh().catch((error) => {
      console.error('토큰 에러: ', error);
    });
  }, [accessToken, dispatch, navigate]);
};
