/* eslint-disable react-hooks/exhaustive-deps */
import { useCheckCode } from '@/hooks/common/inputsUserInfo/useCheckCode';
import { MemberForm } from '@/types/member';
import React, { ChangeEvent, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import * as S from './InputCode.style';

interface InputCodeProps {
  value: Pick<MemberForm, 'email' | 'verificationCode'>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange: (name: string, value: boolean) => void;
  sendSuccess: boolean;
  handleVerifySuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputCode = ({
  value,
  onChange,
  onSuccessChange,
  sendSuccess,
  handleVerifySuccess,
}: InputCodeProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } = useCheckCode(
    value,
    sendSuccess,
    handleVerifySuccess,
  );

  useEffect(() => {
    if (value.verificationCode) {
      onSuccessChange('verificationCode', !isError);
    }
  }, [errorMessage]);

  return (
    <div css={S.inputCodeContainer}>
      <Label id="verificationCode" css={S.labelStyling}>
        인증번호
      </Label>
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
        disabled={!sendSuccess}
        btn={
          <Button
            onClick={handleSubmit}
            css={S.inputCodeBtnStyling(sendSuccess)}
          >
            확인
          </Button>
        }
      />
    </div>
  );
};

export default InputCode;
