/* eslint-disable no-console */
/* eslint-disable no-alert */
import { AxiosErrorResponse, axiosInstance } from '@/api/interceptor';
import { postLogout } from '@/api/member';
import { PATH } from '@/constants/path';
import { useNewDispatch } from '@/store';
import { tokenActions } from '@/store/auth';
import { deleteCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogoutMutation = () => {
  const dispatch = useNewDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // TODO: 백엔드에서 리프레쉬 토큰 쿠키에 저장시키면, 해당 코드 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      delete axiosInstance.defaults.headers.Authorization;
      dispatch(tokenActions.deleteToken());

      navigate(`/${PATH.LOGIN}`);
      alert('로그아웃되었습니다🙂');
    },
    onError: (err: AxiosErrorResponse) => {
      console.log('로그아웃 에러: ', err);
      alert('로그아웃에 실패했습니다😥');
    },
  });
};
