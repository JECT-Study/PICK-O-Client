import React from 'react';
import { Link } from 'react-router-dom';
import { Envelope, Lock } from '@/assets';
import { PATH } from '@/constants/path';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Divider from '@/components/atoms/Divider/Divider';
import SocialLoginButton from '@/components/atoms/SocialLoginButton/SocialLoginButton';
import { useLoginForm } from '@/hooks/login/useLoginForm';
import type { State } from '@/pages/LoginPage/LoginPage';
import * as S from './LoginForm.style';

export interface LoginFormProps {
  showToastModal?: (message: string, callback?: () => void) => void;
  withSignInText?: boolean;
  loginState?: State;
  onModalLoginSuccess?: () => void;
}

const LoginForm = ({
  showToastModal,
  withSignInText,
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
      <div css={S.loginTextStyling}>LOGIN</div>
      <div css={S.loginFormWrapper}>
        <Input
          name="email"
          value={form.email}
          icon={<Envelope />}
          placeholder="이메일"
          onChange={onChange}
          css={S.loginInputStyling}
        />
        <Input
          name="password"
          type="password"
          value={form.password}
          icon={<Lock />}
          placeholder="비밀번호"
          isError={isError}
          errorMessage={errorMessage}
          onChange={onChange}
          css={S.loginInputStyling}
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
        <Link to={`/${PATH.SIGN_UP}`}>
          <div css={S.textStyling}>회원가입</div>
        </Link>
        <Divider orientation="height" length={14} />
        <Link to={`/${PATH.CHANGE.PASSWORD}`}>
          <div css={S.textStyling}>비밀번호 재설정</div>
        </Link>
      </div>
      <Divider orientation="width" length={522} />
      {withSignInText && (
        <div css={S.signInTextStyling}>3초만에 회원가입하고 PICK-O 즐기기!</div>
      )}
      <div css={[S.btnWrapperStyling, withSignInText && S.btnWrapperMargin]}>
        <SocialLoginButton
          variant="kakao"
          onClick={() => {
            handleSocialLogin('kakao');
          }}
        />
        <SocialLoginButton
          variant="google"
          onClick={() => {
            handleSocialLogin('google');
          }}
        />
        <SocialLoginButton
          variant="naver"
          onClick={() => {
            handleSocialLogin('naver');
          }}
        />
      </div>
    </form>
  );
};

export default LoginForm;
