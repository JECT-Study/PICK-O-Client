import { END_POINT } from '@/constants/api';
import { ServerResponse } from '@/types/api';
import { MemberResetForm, MemberVerifyForm } from '@/types/member';
import { axiosInstance } from './interceptor';

// EMAIL_SIGNUP_CODE: '/email/signup/code', 회원가입 때 발송 (이메일)
// EMAIL_RESET_CODE: '/email/reset/code', 재설정 때 발송 (이메일)
// EMAIL_VERIFY: '/email/verify', 인증번호 검증 (이메일, 인증번호)
// EMAIL_RESET: '/email/reset', 비번 초기화 (이메일, 비번, 비번확인)

export const postSignUpCode = async (email: string) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_SIGNUP_CODE}`,
    email,
  );

  return data;
};

export const postResetCode = async (email: string) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_RESET_CODE}`,
    email,
  );

  return data;
};

export const postEmailVerify = async (value: MemberVerifyForm) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_VERIFY}`,
    value,
  );

  return data;
};

export const postPasswordReset = async (value: MemberResetForm) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_RESET}`,
    value,
  );

  return data;
};

export const postEmailRequest = async (email: string) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_REQUEST}`,
    email,
  );
  return data;
};

export const getFindPw = async (email: string) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.FIND_PW}`,
    email,
  );
  return data;
};
