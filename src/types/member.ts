export type Member = {
  id: number;
  nickname: string;
  email: string;
  profileImgUrl: string;
  createdAt: string;
  postsCount: number;
  bookmarkedPostsCount: number;
  signupType: 'SOCIAL' | 'STANDARD';
};

export interface MemberForm {
  email: string;
  verificationCode: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  profileImgId: number | null;
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
  profileImgId: number | null;
};

export type MemberEditNicknameForm = Pick<MemberEditForm, 'nickname'>;

export type MemberEditProfileImgForm = Pick<MemberEditForm, 'profileImgId'>;

export type MemberVerifyForm = Pick<
  MemberResetForm,
  'email' | 'verificationCode'
>;
export type MemberResetPwForm = Pick<
  MemberResetForm,
  'email' | 'password' | 'passwordConfirm'
>;
