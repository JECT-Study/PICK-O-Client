/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { useCheckEmail } from '@/hooks/common/inputsUserInfo/useCheckEmail';
import React, { ChangeEvent, useEffect } from 'react';
import * as S from './InputEmail.style';

interface InputEmailProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
}

const InputEmail = ({
  type,
  value,
  onChange,
  onSuccessChange,
}: InputEmailProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } = useCheckEmail(
    type,
    value,
  );

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('email', !isError);
    }
  }, [errorMessage]);

  return (
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
          <Button onClick={handleSubmit} css={S.inputEmailBtnStyling}>
            {type === 'signup' ? '인증' : '발송'}
          </Button>
        }
      />
    </div>
  );
};

export default InputEmail;
