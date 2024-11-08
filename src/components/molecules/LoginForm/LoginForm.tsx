/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { Envelope, Lock } from '@/assets';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Divider from '@/components/atoms/Divider/Divider';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import SocialLoginButton from '@/components/atoms/SocialLoginButton/SocialLoginButton';
import { useLoginForm } from '@/hooks/login/useLoginForm';
import * as S from './LoginFrom.style';

export interface LoginFormProps {
  withSignInText?: boolean;
}

const LoginForm = ({ withSignInText }: LoginFormProps) => {
  const { form, onChange, isError, errorMessage, handleSubmit, loginSuccess } =
    useLoginForm();

  const handleSocialLogin = (social: string) => {
    window.location.href = `${process.env.API_URL}/oauth2/authorization/${social}`;
  };

  return (
    <form onSubmit={handleSubmit} css={S.loginFormStyling}>
      {loginSuccess && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="black">로그인 완료!</ToastModal>
        </div>
      )}
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
        <Link to="/signup">
          <div css={S.textStyling}>회원가입</div>
        </Link>
        <Divider orientation="height" length={14} />
        <div css={S.textStyling}>비밀번호 찾기</div>
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
