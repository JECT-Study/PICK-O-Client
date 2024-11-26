import { END_POINT } from '@/constants/api';
import { ServerResponse } from '@/types/api';
import {
  Member,
  MemberEditForm,
  MemberEditNicknameForm,
  MemberEditProfileImgForm,
  MemberForm,
} from '@/types/member';
import { axiosInstance } from './interceptor';

export const getMember = async (memberId: number) => {
  const { data } = await axiosInstance.get<Member>(
    `${END_POINT.MEMBER(memberId)}`,
  );
  return data;
};

export const getMemberProfile = async (memberId: number) => {
  const { data } = await axiosInstance.get<Omit<Member, 'id'>>(
    `${END_POINT.MEMBER_PROFILE(memberId)}`,
  );
  return data;
};

export const postMember = async (
  form: Pick<MemberForm, 'nickname' | 'email' | 'password' | 'role'>,
) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.SIGN_UP}`,
    form,
  );
  return data;
};

export const deleteMember = async (
  form: Pick<MemberForm, 'email' | 'password'>,
) => {
  const params = {
    data: form,
  };

  const { data } = await axiosInstance.delete<ServerResponse>(
    `${END_POINT.ALL_MEMBERS}`,
    params,
  );
  return data;
};

export const putMemberImage = async (profilePhoto: string) => {
  const { data } = await axiosInstance.put<ServerResponse>(
    `${END_POINT.MEMBER_IMAGE}`,
    profilePhoto,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    },
  );
  return data;
};

export const putMemberNickname = async (nickname: string) => {
  const { data } = await axiosInstance.put<ServerResponse>(
    `${END_POINT.MEMBER_NICKNAME}`,
    nickname,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    },
  );
  return data;
};

export const putMemberInfo = async (
  memberInfo:
    | MemberEditForm
    | MemberEditNicknameForm
    | MemberEditProfileImgForm,
) => {
  const { data } = await axiosInstance.put<ServerResponse>(
    `${END_POINT.EDIT_MEMBERS}`,
    memberInfo,
  );
  return data;
};

export const putMemberPw = async (pw: string) => {
  const { data } = await axiosInstance.put<ServerResponse>(
    `${END_POINT.MEMBER_PASSWORD}`,
    pw,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    },
  );
  return data;
};

export const postLogin = async (
  form: Pick<MemberForm, 'email' | 'password'>,
) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.LOGIN}`,
    form,
  );
  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post<ServerResponse>(
    `${END_POINT.LOGOUT}`,
  );
  return data;
};

export const getRefreshToken = async () => {
  const { data } = await axiosInstance.get<ServerResponse>(
    `${END_POINT.REFRESH}`,
  );
  return data;
};

export const getNicknameVerify = async (nickname: string) => {
  const { data } = await axiosInstance.get<ServerResponse>(
    `${END_POINT.NICKNAME_VERIFY}`,
    {
      params: {
        nickname,
      },
    },
  );
  return data;
};

export const getPasswordVerify = async (password: string) => {
  const { data } = await axiosInstance.get<boolean>(
    `${END_POINT.PASSWORD_VERIFY}`,
    {
      params: {
        password,
      },
    },
  );
  return data;
};
