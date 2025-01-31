/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import MobileInput from '@/components/mobile/atoms/Input/Input';
import MobileButton from '@/components/mobile/atoms/Button/Button';
import { useCheckEmail } from '@/hooks/common/inputsUserInfo/useCheckEmail';
import { isEmptyString } from '@/utils/validator';
import * as S from './InputEmail.style';

interface InputEmailProps {
  isMobile?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
  handleSendSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  success?: boolean;
}

const InputEmail = ({
  isMobile = false,
  value,
  onChange,
  onSuccessChange,
  handleSendSuccess,
  success = false,
}: InputEmailProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } = useCheckEmail(
    value,
    handleSendSuccess,
  );

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('email', !isError);
    }
  }, [errorMessage]);

  return isMobile ? (
    <MobileInput
      id="email"
      name="email"
      placeholder="이메일을 입력해주세요."
      isError={isError}
      errorMessage={errorMessage}
      value={value}
      ref={inputRef}
      onChange={onChange}
      success={success}
      btn={
        <MobileButton
          onClick={handleSubmit}
          css={S.mobileButtonStyling}
          active={!isEmptyString(value)}
        >
          인증
        </MobileButton>
      }
    />
  ) : (
    <div css={S.inputEmailContainer}>
      <Label id="email" css={S.labelStyling}>
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
          <Button
            onClick={handleSubmit}
            css={S.inputEmailBtnStyling(isEmptyString(value))}
          >
            인증
          </Button>
        }
      />
    </div>
  );
};

export default InputEmail;
