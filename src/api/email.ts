import { END_POINT } from '@/constants/api';
import { ServerResponse } from '@/types/api';
import { MemberResetForm, MemberVerifyForm } from '@/types/member';
import { axiosInstance } from './interceptor';

export const postSignUpCode = async (email: string) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_SIGNUP_CODE}`,
    { email },
  );

  return data;
};

export const postResetCode = async (email: string) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.EMAIL_RESET_CODE}`,
    { email },
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

export const postPasswordReset = async (
  value: Pick<MemberResetForm, 'email' | 'password' | 'passwordConfirm'>,
) => {
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
