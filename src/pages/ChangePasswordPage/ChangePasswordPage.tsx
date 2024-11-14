import React, { useState } from 'react';
import { LogoLarge } from '@/assets';
import Button from '@/components/atoms/Button/Button';
import InputResetEmail from '@/components/molecules/InputResetEmail/InputResetEmail';
import InputCode from '@/components/molecules/InputCode/InputCode';
import InputPw from '@/components/molecules/InputPw/InputPw';
import InputPwConfirm from '@/components/molecules/InputPwConfirm/InputPwConfirm';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { useChangePwForm } from '@/hooks/changePassword/useChangePwForm';
import * as S from './ChangePasswordPage.style';

const ChangePasswordPage = () => {
  const {
    form,
    onChange,
    onSuccessChange,
    isVisible,
    modalText,
    handleSubmit,
    handleCancle,
  } = useChangePwForm();

  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit} css={S.changePasswordPageContainer}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="black">{modalText}</ToastModal>
        </div>
      )}
      <LogoLarge />
      <span css={S.changePasswordTextStying}>비밀번호 재설정</span>
      <div css={S.changePasswordFormStyling}>
        <InputResetEmail
          value={form.email}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
          handleSendSuccess={setSendSuccess}
        />
        <InputCode
          value={{ email: form.email, verificationCode: form.verificationCode }}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
          sendSuccess={sendSuccess}
          handleVerifySuccess={setVerifySuccess}
        />
        {verifySuccess && (
          <div css={S.changePasswordStyling}>
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
            <div css={S.btnContainer}>
              <Button
                variant="outlineSecondary"
                css={S.btnStyling}
                onClick={handleCancle}
              >
                취소
              </Button>
              <Button type="submit" variant="roundPrimary2" css={S.btnStyling}>
                변경하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ChangePasswordPage;
