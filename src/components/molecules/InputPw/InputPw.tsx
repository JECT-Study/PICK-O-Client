/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { INPUT_LIMIT } from '@/constants/input';
import { useCheckPassword } from '@/hooks/common/inputsUserInfo/useCheckPassword';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import MobileInput from '@/components/mobile/atoms/Input/Input';
import * as S from './InputPw.style';

interface InputPwProps {
  isMobile?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
  success?: boolean;
}

const InputPw = ({
  isMobile = false,
  value,
  onChange,
  onSuccessChange,
  success = false,
}: InputPwProps) => {
  const isFirstRender = useRef(true);
  const { inputRef, isError, errorMessage, handleVerify } =
    useCheckPassword(value);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    handleVerify();
  }, [value]);

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('password', !isError);
    }
  }, [errorMessage]);

  return isMobile ? (
    <MobileInput
      id="password"
      name="password"
      type="password"
      placeholder="비밀번호를 입력해주세요."
      minLength={INPUT_LIMIT.PW_MIN}
      maxLength={INPUT_LIMIT.PW_MAX}
      isError={isError}
      errorMessage={errorMessage}
      value={value}
      ref={inputRef}
      onChange={onChange}
      onKeyDown={handleVerify}
      onBlur={handleVerify}
      success={success}
    />
  ) : (
    <div css={S.inputPwContainer}>
      <Label id="password" css={S.labelStyling}>
        비밀번호
      </Label>
      <Input
        id="password"
        name="password"
        type="password"
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
