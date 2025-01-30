/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import MobileInput from '@/components/mobile/atoms/Input/Input';
import MobileButton from '@/components/mobile/atoms/Button/Button';
import { useCheckNickname } from '@/hooks/common/inputsUserInfo/useCheckNickname';
import { isEmptyString } from '@/utils/validator';
import * as S from './InputNickname.style';

interface InputNicknameProps {
  isMobile?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
  success?: boolean;
}

const InputNickname = ({
  isMobile = false,
  value,
  onChange,
  onSuccessChange,
  success = false,
}: InputNicknameProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } =
    useCheckNickname(value);

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('nickname', !isError);
    }
  }, [errorMessage]);

  return isMobile ? (
    <MobileInput
      id="nickname"
      name="nickname"
      placeholder="닉네임을 입력해주세요."
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
          확인
        </MobileButton>
      }
    />
  ) : (
    <div css={S.inputNicknameContainer}>
      <Label id="nickname" css={S.labelStyling}>
        닉네임
      </Label>
      <Input
        id="nickname"
        name="nickname"
        placeholder="닉네임을 입력해주세요."
        size="small"
        isError={isError}
        errorMessage={errorMessage}
        value={value}
        ref={inputRef}
        onChange={onChange}
        btn={
          <Button
            onClick={handleSubmit}
            css={S.inputNicknameBtnStyling(isEmptyString(value))}
          >
            확인
          </Button>
        }
      />
    </div>
  );
};

export default InputNickname;
