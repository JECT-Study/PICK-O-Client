/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputInfoPw.style';

const InputInfoPw = () => {
  return (
    <div css={S.inputInfoPwContainer}>
      <Label id="password" css={S.labelStyling}>
        비밀번호
      </Label>
      <Input type="password" placeholder="비밀번호 입력" size="small" />
    </div>
  );
};

export default InputInfoPw;
