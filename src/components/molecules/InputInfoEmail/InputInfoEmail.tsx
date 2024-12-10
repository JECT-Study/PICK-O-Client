import React from 'react';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputInfoEmail.style';

interface InputEmailProps {
  value?: string;
}

const InputInfoEmail = ({ value }: InputEmailProps) => {
  return (
    <div css={S.inputInfoEmailContainer}>
      <Label id="email" css={S.labelStyling}>
        이메일
      </Label>
      <Input value={value ?? ''} size="small" readOnly />
    </div>
  );
};

export default InputInfoEmail;
