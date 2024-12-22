import React, { useState, useEffect } from 'react';
import { LogoLarge } from '@/assets';
import LoginForm from '@/components/molecules/LoginForm/LoginForm';
import { useLocation } from 'react-router-dom';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import * as S from './LoginPage.style';

export interface State {
  talkPickId?: number;
  status?: string;
}

const LoginPage = () => {
  const location = useLocation();
  const state = location.state as State;

  const { isVisible, modalText, showToastModal } = useToastModal();
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  useEffect(() => {
    if (state?.status === 'already_registered' && modalVisible) {
      showToastModal('이미 가입한 이메일입니다.');
      setModalVisible(false);
    }
  }, [modalVisible, showToastModal, state?.status]);

  return (
    <div css={S.loginContainer}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <LogoLarge css={S.logoStyle} />
      <LoginForm
        showToastModal={showToastModal}
        withSignInText
        loginState={state}
      />
    </div>
  );
};

export default LoginPage;
