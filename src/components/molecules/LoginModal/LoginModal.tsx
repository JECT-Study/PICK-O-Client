import React from 'react';
import Modal from '@/components/atoms/Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

export interface LoginModalProps {
  withSignInText?: boolean;
  isOpen?: boolean;
  onModalLoginSuccess?: () => void;
  onClose?: () => void;
}

const LoginModal = ({
  withSignInText,
  isOpen,
  onModalLoginSuccess,
  onClose,
}: LoginModalProps) => {
  return (
    <Modal action="default" isOpen={isOpen} onClose={onClose}>
      <LoginForm
        withSignInText={withSignInText}
        onModalLoginSuccess={onModalLoginSuccess}
      />
    </Modal>
  );
};

export default LoginModal;
