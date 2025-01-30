import React, { useState } from 'react';
import Button from '@/components/mobile/atoms/Button/Button';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import InputCode from '@/components/molecules/InputCode/InputCode';
import InputEmail from '@/components/molecules/InputEmail/InputEmail';
import InputNickname from '@/components/molecules/InputNickname/InputNickname';
import InputProfileImage from '@/components/molecules/InputProfileImage/InputProfileImage';
import InputPw from '@/components/molecules/InputPw/InputPw';
import InputPwConfirm from '@/components/molecules/InputPwConfirm/InputPwConfirm';
import { useSignupForm } from '@/hooks/signup/useSignupForm';
import * as S from './SignUpMobilePage.style';

const SignUpMobilePage = () => {
  const {
    form,
    onChange,
    onSuccessChange,
    setEach,
    isVisible,
    modalText,
    handleSubmit,
    handleCancel,
  } = useSignupForm();

  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit} css={S.signupContainer}>
      {isVisible && (
        <div css={S.signupToastModalStyling}>
          <ToastModal bgColor="black">{modalText}</ToastModal>
        </div>
      )}
      <div css={S.signUpHeadingStyling}>프로필 입력</div>
      <div css={S.profileImageWrapper}>
        <InputProfileImage isMobile setImageFileId={setEach} />
      </div>
      <InputEmail
        isMobile
        type="signup"
        value={form.email}
        onChange={onChange}
        onSuccessChange={onSuccessChange}
        handleSendSuccess={setSendSuccess}
      />
      <InputCode
        isMobile
        value={{ verificationCode: form.verificationCode, email: form.email }}
        onChange={onChange}
        onSuccessChange={onSuccessChange}
        sendSuccess={sendSuccess}
      />
      <InputNickname
        isMobile
        value={form.nickname}
        onChange={onChange}
        onSuccessChange={onSuccessChange}
      />
      <InputPw
        isMobile
        value={form.password}
        onChange={onChange}
        onSuccessChange={onSuccessChange}
      />
      <InputPwConfirm
        isMobile
        value={form.passwordConfirm}
        onChange={onChange}
        onSuccessChange={onSuccessChange}
        pw={form.password}
      />
      <div css={S.btnContainer}>
        <Button active={false} onClick={handleCancel}>
          취소
        </Button>
        <Button type="submit">회원가입</Button>
      </div>
    </form>
  );
};

export default SignUpMobilePage;
