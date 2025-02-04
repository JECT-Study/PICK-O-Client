import React, { useState, useEffect } from 'react';
import { ERROR, SUCCESS } from '@/constants/message';
import { LogoLarge, LogoMedium } from '@/assets';
import LoginForm from '@/components/molecules/LoginForm/LoginForm';
import MobileLoginForm from '@/components/mobile/molecules/MobileLoginForm/MobileLoginForm';
import { useLocation } from 'react-router-dom';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import useIsMobile from '@/hooks/common/useIsMobile';
import * as S from './LoginPage.style';

export interface State {
  talkPickId?: number;
  status?: string;
}

const LoginPage = () => {
  const isMobile = useIsMobile();

  const location = useLocation();
  const state = location.state as State;

  const { isVisible, modalText, showToastModal } = useToastModal();
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  useEffect(() => {
    if (state?.status === 'already_registered' && modalVisible) {
      showToastModal(ERROR.EMAIL.EXIST);
      setModalVisible(false);
    }

    if (state?.status === 'logout' && modalVisible) {
      showToastModal(SUCCESS.LOGOUT);
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
      {isMobile ? (
        <>
          <LogoMedium css={S.logoStyle} />
          <MobileLoginForm showToastModal={showToastModal} loginState={state} />
        </>
      ) : (
        <>
          <LogoLarge css={S.logoStyle} />
          <LoginForm
            showToastModal={showToastModal}
            withSignInText
            loginState={state}
          />
        </>
      )}
    </div>
  );
};

export default LoginPage;
