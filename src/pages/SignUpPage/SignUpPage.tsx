import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import InputCode from '@/components/molecules/InputCode/InputCode';
import InputEmail from '@/components/molecules/InputEmail/InputEmail';
import InputNickname from '@/components/molecules/InputNickname/InputNickname';
import InputProfileImage from '@/components/molecules/InputProfileImage/InputProfileImage';
import InputPw from '@/components/molecules/InputPw/InputPw';
import InputPwConfirm from '@/components/molecules/InputPwConfirm/InputPwConfirm';
import { useSignupForm } from '@/hooks/signup/useSignupForm';
import * as S from './SignUpPage.style';

const SignUpPage = () => {
  const {
    form,
    onChange,
    onSuccessChange,
    setEach,
    isVisible,
    modalText,
    handleSubmit,
    handleCancle,
  } = useSignupForm();

  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit} css={S.signupContainer}>
      {isVisible && (
        <div css={S.signupToastModalStyling}>
          <ToastModal bgColor="black">{modalText}</ToastModal>
        </div>
      )}
      <span css={S.signUpHeadingStyling}>SIGN UP</span>
      <InputProfileImage setProfilePhoto={setEach} />
      <div css={S.inputContainer}>
        <InputEmail
          type="signup"
          value={form.email}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
          handleSendSuccess={setSendSuccess}
        />
        <InputCode
          value={{ verificationCode: form.verificationCode, email: form.email }}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
          sendSuccess={sendSuccess}
        />
        <InputNickname
          value={form.nickname}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
        />
        <InputPw
          value={form.password}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
        />
        <InputPwConfirm
          value={form.passwordConfirm}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
          pw={form.password}
        />
      </div>
      <div css={S.btnContainer}>
        <Button
          onClick={handleCancle}
          variant="outlineSecondary"
          css={S.btnSignup}
        >
          취소
        </Button>
        <Button type="submit" variant="roundPrimary2" css={S.btnSignup}>
          회원가입
        </Button>
      </div>
    </form>
  );
};

export default SignUpPage;
