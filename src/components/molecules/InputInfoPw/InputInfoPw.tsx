import React, { ChangeEvent } from 'react';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputInfoPw.style';

interface InputInfoPwProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  isError: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputInfoPw = ({
  inputRef,
  isError,
  errorMessage,
  onChange,
  onKeyDown,
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
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputInfoPw;
