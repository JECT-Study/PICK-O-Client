import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/path';
import Button from '@/components/mobile/atoms/Button/Button';
import Input from '@/components/mobile/atoms/Input/Input';
import Divider from '@/components/atoms/Divider/Divider';
import SocialLoginButton from '@/components/atoms/SocialLoginButton/SocialLoginButton';
import { useLoginForm } from '@/hooks/login/useLoginForm';
import type { State } from '@/pages/LoginPage/LoginPage';
import * as S from './MobileLoginForm.style';

export interface LoginFormProps {
  showToastModal?: (message: string, callback?: () => void) => void;
  loginState?: State;
  onModalLoginSuccess?: () => void;
}

const MobileLoginForm = ({
  showToastModal,
  loginState,
  onModalLoginSuccess,
}: LoginFormProps) => {
  const { form, onChange, isError, errorMessage, handleSubmit } = useLoginForm(
    showToastModal,
    loginState?.talkPickId,
    onModalLoginSuccess,
  );

  const handleSocialLogin = (social: string) => {
    window.location.href = `${process.env.API_URL}/oauth2/authorization/${social}`;
  };

  return (
    <form onSubmit={handleSubmit} css={S.loginFormStyling}>
      <div css={S.loginFormWrapper}>
        <Input
          name="email"
          value={form.email}
          placeholder="이메일"
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          value={form.password}
          placeholder="비밀번호"
          isError={isError}
          errorMessage={errorMessage}
          onChange={onChange}
        />
        <Button
          type="submit"
          size="large"
          variant="roundPrimary"
          css={S.loginBtnStyling}
        >
          로그인
        </Button>
      </div>
      <div css={S.textWrapperStyling}>
        <Link to={`/${PATH.CHANGE.PASSWORD}`}>
          <div css={S.pwTextStyling}>비밀번호 재설정</div>
        </Link>
        <Link to={`/${PATH.SIGN_UP}`}>
          <div css={S.signupTextStyling}>회원가입</div>
        </Link>
      </div>
      <Divider orientation="width" length={335} tone="wv" />
      <div css={S.signInTextStyling}>3초만에 회원가입하고 PICK-O 즐기기!</div>
      <div css={S.btnWrapperStyling}>
        <SocialLoginButton
          variant="kakao"
          size="small"
          onClick={() => {
            handleSocialLogin('kakao');
          }}
        />
        <SocialLoginButton
          variant="google"
          size="small"
          onClick={() => {
            handleSocialLogin('google');
          }}
        />
        <SocialLoginButton
          variant="naver"
          size="small"
          onClick={() => {
            handleSocialLogin('naver');
          }}
        />
      </div>
    </form>
  );
};

export default MobileLoginForm;
