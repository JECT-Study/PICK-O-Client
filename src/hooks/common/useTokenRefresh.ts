/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { axiosInstance, getRefreshToken } from '@/api/interceptor';
import { PATH } from '@/constants/path';
import store, { useNewDispatch, useNewSelector } from '@/store';
import { selectAccessToken, tokenActions } from '@/store/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTokenRefresh = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();

  // 로그인 된 상태였는지 여부 확인
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');
  const accessToken = useNewSelector(selectAccessToken);

  // 페이지 새로 고침이나 소셜 로그인 시
  // 리프레시 토큰을 사용한 액세스 토큰 발급으로 로그인 유지
  useEffect(() => {
    const tokenRefresh = async () => {
      // 로그인이 안된 비회원 상태이면 리턴
      // 이미 리덕스에 토큰이 담겨있으면 재발급 없이 리턴
      if (!isLoggedIn || accessToken) return;

      try {
        // 쿠키에 담긴 리프레시 토큰으로 액세스 토큰 재발급
        const newAccessToken = await getRefreshToken();
        console.log('useTokenRefresh', newAccessToken);

        // 해더와 리덕스에 새 토큰 넣음
        dispatch(tokenActions.setToken(newAccessToken));
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        // 로컬 스토리지에 로그인 상태 업데이트 (첫 소셜 로그인 시)
        localStorage.setItem('isLoggedIn', 'true');
      } catch (error) {
        // 로그인 상태에서 액세스 토큰 재발급 실패
        // = 리프레시 토큰 유효성 검사 실패
        // 토큰 재발급 실패 시 헤더와 리덕스에서 토큰 제거
        store.dispatch(tokenActions.deleteToken());
        delete axiosInstance.defaults.headers.Authorization;

        // 로컬 스토리지에 로그인 여부 제거
        localStorage.removeItem('isLoggedIn');

        // 로그인 페이지로 이동
        console.log('토큰리프레시 훅에서 표시!!');
        navigate(`/${PATH.LOGIN}`);
      }
    };
    tokenRefresh().catch((error) => {
      console.error('토큰 에러: ', error);
    });
  }, [accessToken, dispatch, isLoggedIn, navigate]);
};
