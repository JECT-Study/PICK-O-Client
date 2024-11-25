export type Member = {
  id: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  postsCount: number;
  totalPostLike: number;
  level: 0 | 1 | 2;
};

export interface MemberForm {
  email: string;
  verificationCode: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  profileImgUrl: string;
  role: 'USER';
}

export interface MemberSuccesForm {
  [key: string]: boolean;
}

export interface MemberResetForm {
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
}

export type MemberEditForm = {
  nickname: string;
  profileImgId: number;
};

export type MemberVerifyForm = Pick<
  MemberResetForm,
  'email' | 'verificationCode'
>;
export type MemberResetPwForm = Pick<
  MemberResetForm,
  'email' | 'password' | 'passwordConfirm'
>;
