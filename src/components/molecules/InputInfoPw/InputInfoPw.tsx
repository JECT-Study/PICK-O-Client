import React, { ChangeEvent } from 'react';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputInfoPw.style';

interface InputInfoPwProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  isError: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputInfoPw = ({
  inputRef,
  isError,
  errorMessage,
  onChange,
}: InputInfoPwProps) => {
  return (
    <div css={S.inputInfoPwContainer}>
      <Label id="password" css={S.labelStyling}>
        비밀번호
      </Label>
      <Input
        type="password"
        ref={inputRef}
        isError={isError}
        errorMessage={errorMessage}
        onChange={onChange}
        placeholder="비밀번호 입력"
        size="small"
      />
    </div>
  );
};

export default InputInfoPw;
