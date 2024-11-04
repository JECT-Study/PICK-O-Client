/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { useCheckExistEmail } from '@/hooks/common/inputsUserInfo/useCheckExistEmail';
import * as S from './InputResetEmail.style';

interface InputResetEmailProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
}

const InputResetEmail = ({
  value,
  onChange,
  onSuccessChange,
}: InputResetEmailProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } =
    useCheckExistEmail(value);

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('email', !isError);
    }
  }, [errorMessage]);

  return (
    <div css={S.inputResetEmailContainer}>
      <Label id="emailForReset" css={S.labelStyling}>
        이메일
      </Label>
      <Input
        id="email"
        name="email"
        placeholder="이메일을 입력해주세요."
        size="small"
        isError={isError}
        errorMessage={errorMessage}
        value={value}
        ref={inputRef}
        onChange={onChange}
        btn={
          <Button onClick={handleSubmit} css={S.inputResetEmailBtnStyling}>
            인증
          </Button>
        }
      />
    </div>
  );
};

export default InputResetEmail;
