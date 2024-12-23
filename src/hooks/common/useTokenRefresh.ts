import { axiosInstance } from '@/api/interceptor';
import { useNewDispatch, useNewSelector } from '@/store';
import { selectAccessToken, tokenActions } from '@/store/auth';
import { isTimeLimit } from '@/utils/validator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParseJwt } from './useParseJwt';

export const useTokenRefresh = () => {
  const accessToken = useNewSelector(selectAccessToken);
  // TODO
  const refreshToken = localStorage.getItem('refreshToken');
  const localstorageAccessToken = localStorage.getItem('accessToken');
  const dispatch = useNewDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenRefresh = () => {
      if (!accessToken && refreshToken) {
        if (isTimeLimit(useParseJwt(localstorageAccessToken).exp)) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          delete axiosInstance.defaults.headers.Authorization;
          dispatch(tokenActions.deleteToken());
          alert('로그인 시간이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
          // getRefreshToken()
          //   .then((res) => {
          //     console.log('재발급 성공');
          //     console.log(res);
          //     dispatch(tokenActions.setToken(res));
          //     axiosInstance.defaults.headers.Authorization = `Bearer ${res}`;
          //     localStorage.setItem('accessToken', res);
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //   });
        } else {
          dispatch(tokenActions.setToken(localstorageAccessToken));
          axiosInstance.defaults.headers.Authorization = `Bearer ${localstorageAccessToken}`;
        }
      }
    };
    tokenRefresh();
  }, [accessToken, refreshToken, dispatch]);
};
