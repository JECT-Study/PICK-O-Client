/* eslint-disable react-hooks/exhaustive-deps */
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { useCheckPasswordCheck } from '@/hooks/common/inputsUserInfo/useCheckPasswordCheck';
import React, { ChangeEvent, useEffect } from 'react';
import * as S from './InputPwCheck.style';

interface InputPwCheckProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
  pw: string;
}

const InputPwCheck = ({
  value,
  onChange,
  onSuccessChange,
  pw,
}: InputPwCheckProps) => {
  const { inputRef, isError, errorMessage, handleVerify } =
    useCheckPasswordCheck({ value, pw });

  useEffect(() => {
    if (isError) {
      handleVerify();
    }
  }, [value]);

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('passwordCheck', !isError);
    }
  }, [errorMessage]);

  return (
    <div css={S.inputPwCheckContainer}>
      <Label id="passwordCheck" css={S.labelStyling}>
        비밀번호 확인
      </Label>
      <Input
        id="passwordCheck"
        name="passwordCheck"
        placeholder="비밀번호를 재입력해주세요."
        size="small"
        isError={isError}
        errorMessage={errorMessage}
        value={value}
        ref={inputRef}
        onChange={onChange}
        onKeyDown={handleVerify}
        onBlur={handleVerify}
      />
    </div>
  );
};

export default InputPwCheck;
