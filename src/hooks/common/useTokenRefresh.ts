/* eslint-disable no-console */
import { getRefreshToken } from '@/api/interceptor';
import { useNewDispatch, useNewSelector } from '@/store';
import { selectAccessToken, tokenActions } from '@/store/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTokenRefresh = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();

  const accessToken = useNewSelector(selectAccessToken);

  useEffect(() => {
    const tokenRefresh = async () => {
      if (accessToken) {
        dispatch(tokenActions.setRefreshing(false));
        return;
      }

      try {
        const newAccessToken = await getRefreshToken();
        dispatch(tokenActions.setToken(newAccessToken));
      } catch (error) {
        dispatch(tokenActions.deleteToken());
      } finally {
        dispatch(tokenActions.setRefreshing(false));
      }
    };
    tokenRefresh().catch((error) => {
      console.error('토큰 에러: ', error);
    });
  }, [accessToken, dispatch, navigate]);
};
