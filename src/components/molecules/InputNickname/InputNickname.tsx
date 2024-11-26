/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { useCheckNickname } from '@/hooks/common/inputsUserInfo/useCheckNickname';
import { isEmptyString } from '@/utils/validator';
import * as S from './InputNickname.style';

interface InputNicknameProps {
  type?: string;
  defaultValue?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSuccessChange?: (name: string, value: boolean) => void;
}

const InputNickname = ({
  type,
  defaultValue,
  value,
  onChange,
  onSuccessChange,
}: InputNicknameProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } = useCheckNickname(
    value,
    defaultValue,
    type,
  );

  useEffect(() => {
    if (value && onSuccessChange) {
      onSuccessChange('nickname', !isError);
    }
  }, [errorMessage]);

  return (
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
            css={[
              S.inputNicknameBtnStyling(isEmptyString(value)),
              type === 'changeInfo' && S.getButtonStyling(value, defaultValue),
            ]}
          >
            확인
          </Button>
        }
      />
    </div>
  );
};

export default InputNickname;
