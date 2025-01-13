/* eslint-disable no-alert */
/* eslint-disable no-console */
import { axiosInstance, getRefreshToken } from '@/api/interceptor';
import { NOTICE } from '@/constants/message';
import { PATH } from '@/constants/path';
import store, { useNewDispatch, useNewSelector } from '@/store';
import { selectAccessToken, tokenActions } from '@/store/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTokenRefresh = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('isLoggedIn');
  const accessToken = useNewSelector(selectAccessToken);

  useEffect(() => {
    const tokenRefresh = async () => {
      if (!isLoggedIn || accessToken) return;

      try {
        const newAccessToken = await getRefreshToken();

        dispatch(tokenActions.setToken(newAccessToken));
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        localStorage.setItem('isLoggedIn', 'true');
      } catch (error) {
        store.dispatch(tokenActions.deleteToken());
        delete axiosInstance.defaults.headers.Authorization;

        localStorage.removeItem('isLoggedIn');

        alert(NOTICE.LOGIN.EXPIRED);
        navigate(`/${PATH.LOGIN}`);
      }
    };
    tokenRefresh().catch((error) => {
      console.error('토큰 에러: ', error);
    });
  }, [accessToken, dispatch, isLoggedIn, navigate]);
};
