import React, { useState } from 'react';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import Button from '@/components/atoms/Button/Button';
import InputInfoEmail from '@/components/molecules/InputInfoEmail/InputInfoEmail';
import InputInfoPw from '@/components/molecules/InputInfoPw/InputInfoPw';
import InputProfileImage from '@/components/molecules/InputProfileImage/InputProfileImage';
import InputNickname from '@/components/molecules/InputNickname/InputNickname';
import { useCheckPasswordVerify } from '@/hooks/common/inputsUserInfo/useCheckPasswordVerify';
import * as S from './ChangeUserInfoPage.style';

const ChangeUserInfoPage = () => {
  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);

  const { inputRef, isError, errorMessage, handleSubmit } =
    useCheckPasswordVerify(passwordInput, setVerifySuccess);

  return (
    <form css={S.changeUserInfoPageContainer}>
      {verifySuccess ? (
        <>
          <span css={S.subTextStyling}>회원정보 수정</span>
          <div css={S.changeUserInfoFormStyling}>
            <InputProfileImage
              setProfilePhoto={() => {}}
              imgSrc={member?.profileImgUrl}
            />
            <InputNickname value={member?.nickname ?? ''} onChange={() => {}} />
          </div>
          <Button variant="roundPrimary2" css={S.btnStyling}>
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
              onClick={handleSubmit}
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
