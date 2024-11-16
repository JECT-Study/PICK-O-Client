import React from 'react';
import { LogoLarge } from '@/assets';
import LoginForm from '@/components/molecules/LoginForm/LoginForm';
import { useLocation } from 'react-router-dom';
import * as S from './LoginPage.style';

interface State {
  talkPickId: number;
}

const LoginPage = () => {
  const location = useLocation();
  const state = location.state as State;

  return (
    <div css={S.loginContainer}>
      <LogoLarge css={S.logoStyle} />
      <LoginForm withSignInText pathTalkPickId={state?.talkPickId} />
    </div>
  );
};

export default LoginPage;
