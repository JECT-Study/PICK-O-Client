import React from 'react';
import { LogoLarge } from '@/assets';
import Button from '@/components/atoms/Button/Button';
import InputResetEmail from '@/components/molecules/InputResetEmail/InputResultEmail';
import InputResetCode from '@/components/molecules/InputResetCode/InputResetCode';
import InputPw from '@/components/molecules/InputPw/InputPw';
import InputPwCheck from '@/components/molecules/InputPwCheck/InputPwCheck';
import * as S from './ChangePasswordPage.style';

const ChangePasswordPage = () => {
  return (
    <div css={S.changePasswordPageContainer}>
      <LogoLarge />
      <span css={S.changePasswordTextStying}>비밀번호 재설정</span>
      <div css={S.changePasswordFormStyling}>
        <InputResetEmail />
        <InputResetCode />
        <div css={S.changePasswordStyling}>
          <InputPw value="" onChange={() => {}} onSuccessChange={() => {}} />
          <InputPwCheck
            value=""
            onChange={() => {}}
            onSuccessChange={() => {}}
            pw=""
          />
          <div css={S.btnContainer}>
            <Button variant="outlineSecondary" css={S.btnStyling}>
              취소
            </Button>
            <Button variant="roundPrimary2" css={S.btnStyling}>
              변경하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
