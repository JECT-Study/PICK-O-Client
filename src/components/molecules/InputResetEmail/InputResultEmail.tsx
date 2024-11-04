import React from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputResetEmail.style';

const InputResetEmail = () => {
  return (
    <div css={S.inputResetEmailContainer}>
      <Label id="emailForReset">이메일</Label>
      <Input
        size="small"
        placeholder="이메일을 입력해주세요."
        btn={<Button css={S.inputResetEmailBtnStyling}>인증</Button>}
      />
    </div>
  );
};

export default InputResetEmail;
