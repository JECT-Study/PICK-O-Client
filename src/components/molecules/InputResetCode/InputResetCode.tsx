/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';
import { MemberVerifyForm } from '@/types/member';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { useCheckCode } from '@/hooks/common/inputsUserInfo/useCheckCode';
import * as S from './InputResetCode.style';

interface InputResetCodeProps {
  value: MemberVerifyForm;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange: (name: string, value: boolean) => void;
}

const InputResetCode = ({
  value,
  onChange,
  onSuccessChange,
}: InputResetCodeProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } = useCheckCode(value);

  useEffect(() => {
    if (value.verificationCode) {
      onSuccessChange('verificationCode', !isError);
    }
  }, [errorMessage]);

  return (
    <div css={S.inputResetCodeContainer}>
      <Label id="resetCode">인증번호</Label>
      <Input
        id="verificationCode"
        name="verificationCode"
        placeholder="인증번호 입력"
        size="small"
        isError={isError}
        errorMessage={errorMessage}
        value={value.verificationCode}
        ref={inputRef}
        onChange={onChange}
        btn={
          <Button onClick={handleSubmit} css={S.inputResetCodeBtnStyling}>
            확인
          </Button>
        }
      />
    </div>
  );
};

export default InputResetCode;
