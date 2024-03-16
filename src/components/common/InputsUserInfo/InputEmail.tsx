import React, { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import Button from '../../design/Button/Button';
import Input from '../../design/Input/Input';
import { useCheckEmail } from '../../../hooks/common/inputsUserInfo/useCheckEmail';

interface InputEmailProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputEmail = ({ type, value, onChange }: InputEmailProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } = useCheckEmail(
    type,
    value,
  );

  return (
    <Input
      name="email"
      placeholder="이메일을 입력해주세요."
      size="medium"
      label="이메일"
      isError={isError}
      errorMessage={errorMessage}
      value={value}
      ref={inputRef}
      onChange={onChange}
      btn={
        <Button onClick={handleSubmit}>
          {type === 'signup' ? '인증' : '발송'}
        </Button>
      }
      css={css({ width: '350px' })}
    />
  );
};

export default InputEmail;
