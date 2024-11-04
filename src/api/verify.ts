import { END_POINT } from '@/constants/api';
import { ServerResponse } from '@/types/api';
import { MemberForm, MemberResetForm, MemberVerifyForm } from '@/types/member';
import { axiosInstance } from './interceptor'

export const postEmailCode = async (email: Pick<MemberForm, 'email'>) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.VERIFY_EMAIL}`,
    email,
  );

  return data;
};

export const postCodeVerify = async (form: MemberVerifyForm) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.VERIFY_CODE}`,
    form,
  );
  return data;
};

export const postResetPassword = async (form: MemberResetForm) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.VERIFY_RESET}`,
    form,
  );
  return data;
};
