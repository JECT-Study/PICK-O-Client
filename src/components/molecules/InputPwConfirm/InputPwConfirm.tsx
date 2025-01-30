/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import MobileInput from '@/components/mobile/atoms/Input/Input';
import { useCheckPasswordCheck } from '@/hooks/common/inputsUserInfo/useCheckPasswordCheck';
import * as S from './InputPwConfirm.style';

interface InputPwConfirmProps {
  isMobile?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
  pw: string;
}

const InputPwConfirm = ({
  isMobile = false,
  value,
  onChange,
  onSuccessChange,
  pw,
}: InputPwConfirmProps) => {
  const { inputRef, isError, errorMessage, handleVerify } =
    useCheckPasswordCheck({ value, pw });

  useEffect(() => {
    if (isError) {
      handleVerify();
    }
  }, [value]);

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('passwordConfirm', !isError);
    }
  }, [errorMessage]);

  return isMobile ? (
    <MobileInput
      id="passwordConfirm"
      name="passwordConfirm"
      type="password"
      placeholder="비밀번호를 재입력해주세요."
      isError={isError}
      errorMessage={errorMessage}
      value={value}
      ref={inputRef}
      onChange={onChange}
      onKeyDown={handleVerify}
      onBlur={handleVerify}
    />
  ) : (
    <div css={S.inputPwConfirmContainer}>
      <Label id="passwordConfirm" css={S.labelStyling}>
        비밀번호 확인
      </Label>
      <Input
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
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

export default InputPwConfirm;
