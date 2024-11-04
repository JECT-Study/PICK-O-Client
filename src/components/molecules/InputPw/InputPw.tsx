/* eslint-disable react-hooks/exhaustive-deps */
import { INPUT_LIMIT } from '@/constants/input';
import { useCheckPassword } from '@/hooks/common/inputsUserInfo/useCheckPassword';
import React, { ChangeEvent, useEffect } from 'react';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputPw.style';

interface InputPwProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
}

const InputPw = ({ value, onChange, onSuccessChange }: InputPwProps) => {
  const { inputRef, isError, errorMessage, handleVerify } =
    useCheckPassword(value);

  useEffect(() => {
    if (isError) {
      handleVerify();
    }
  }, [value]);

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('password', !isError);
    }
  }, [errorMessage]);

  return (
    <div css={S.inputPwContainer}>
      <Label id="password" css={S.labelStyling}>
        비밀번호
      </Label>
      <Input
        id="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        size="small"
        minLength={INPUT_LIMIT.PW_MIN}
        maxLength={INPUT_LIMIT.PW_MAX}
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

export default InputPw;
