import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import InputInfoEmail from '@/components/molecules/InputInfoEmail/InputInfoEmail';
import InputInfoPw from '@/components/molecules/InputInfoPw/InputInfoPw';
import InputProfileImage from '@/components/molecules/InputProfileImage/InputProfileImage';
import InputNickname from '@/components/molecules/InputNickname/InputNickname';
import * as S from './ChangeUserInfoPage.style';

const ChangeUserInfoPage = () => {
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);

  return (
    <form css={S.changeUserInfoPageContainer}>
      {verifySuccess ? (
        <>
          <span css={S.subTextStyling}>회원정보 수정</span>
          <div css={S.changeUserInfoFormStyling}>
            <InputProfileImage setProfilePhoto={() => {}} imgSrc="" />
            <InputNickname
              value=""
              onChange={() => {}}
              onSuccessChange={() => {}}
            />
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
          <div css={S.checkPasswordFormStyling}>
            <InputInfoEmail value="email@naver.com" />
            <InputInfoPw />
          </div>
          <Button
            variant="roundPrimary2"
            css={S.btnStyling}
            onClick={() => {
              setVerifySuccess(true);
            }}
          >
            확인
          </Button>
        </>
      )}
    </form>
  );
};

export default ChangeUserInfoPage;
