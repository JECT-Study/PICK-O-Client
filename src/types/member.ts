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
  passwordCheck: string;
  profileImgUrl: string;
  role: 'USER';
}

export interface MemberSuccesForm {
  [key: string]: boolean;
}

export type MemberVerifyForm = Pick<MemberForm, 'email' | 'verificationCode'>;

export interface MemberResetForm {
  email: string;
  password: string;
  passwordConfirm: string;
}
