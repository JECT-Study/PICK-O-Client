import React from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputResetCode.style';

const InputResetCode = () => {
  return (
    <div css={S.inputResetCodeContainer}>
      <Label id="resetCode">인증번호</Label>
      <Input
        size="small"
        placeholder="인증번호 입력"
        btn={<Button css={S.inputResetCodeBtnStyling}>확인</Button>}
      />
    </div>
  );
};

export default InputResetCode;
