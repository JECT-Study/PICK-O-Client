import React, { useState } from 'react';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import Button from '@/components/atoms/Button/Button';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import InputInfoEmail from '@/components/molecules/InputInfoEmail/InputInfoEmail';
import InputInfoPw from '@/components/molecules/InputInfoPw/InputInfoPw';
import InputProfileImage from '@/components/molecules/InputProfileImage/InputProfileImage';
import InputNickname from '@/components/molecules/InputNickname/InputNickname';
import { useCheckPasswordVerify } from '@/hooks/common/inputsUserInfo/useCheckPasswordVerify';
import { useChangeUserInfoForm } from '@/hooks/changeUserInfo/useChangeUserInfoForm';
import * as S from './ChangeUserInfoPage.style';

const ChangeUserInfoPage = () => {
  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);

  const { inputRef, isError, errorMessage, handlePasswordSubmit } =
    useCheckPasswordVerify(passwordInput, setVerifySuccess);

  const {
    form,
    onChange,
    setEach,
    onSuccessChange,
    isVisible,
    modalText,
    handleUserInfoSubmit,
  } = useChangeUserInfoForm(member?.nickname);

  return (
    <form onSubmit={handleUserInfoSubmit} css={S.changeUserInfoPageContainer}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      {verifySuccess ? (
        <>
          <span css={S.subTextStyling}>회원정보 수정</span>
          <div css={S.changeUserInfoFormStyling}>
            <InputProfileImage
              setImageFileId={setEach}
              imgSrc={member?.profileImgUrl}
            />
            <InputNickname
              type="changeInfo"
              value={form.nickname}
              onChange={onChange}
              defaultValue={member?.nickname}
              onSuccessChange={onSuccessChange}
            />
          </div>
          <Button type="submit" variant="roundPrimary2" css={S.btnStyling}>
            수정완료
          </Button>
        </>
      ) : (
        <>
          <span css={S.subTextStyling}>비밀번호 확인</span>
          <span css={S.checkPasswordTextStyling}>
            회원정보 보호를 위해, 비밀번호를 다시 한번 입력해 주세요.
          </span>
          <div css={S.checkPasswordFormWrapper}>
            <div css={S.checkPasswordFormStyling}>
              <InputInfoEmail value={member?.email} />
              <InputInfoPw
                inputRef={inputRef}
                isError={isError}
                errorMessage={errorMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPasswordInput(e.target.value)
                }
              />
            </div>
            <Button
              variant="roundPrimary2"
              css={S.btnStyling}
              onClick={handlePasswordSubmit}
            >
              확인
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ChangeUserInfoPage;
