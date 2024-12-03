import React, { ChangeEvent, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { isEmptyString } from '@/utils/validator';
import { useCheckNicknameChanged } from '@/hooks/common/inputsUserInfo/useCheckNicknameChanged';
import * as S from './InputInfoNickname.style';

interface InputInfoNicknameProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
  setIsNicknameChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNicknameSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputInfoNickname = ({
  value,
  onChange,
  defaultValue,
  setIsNicknameChanged,
  setIsNicknameSuccess,
}: InputInfoNicknameProps) => {
  const { inputRef, isError, errorMessage, handleSubmit } =
    useCheckNicknameChanged(value, defaultValue, setIsNicknameSuccess);

  useEffect(() => {
    if (value !== defaultValue) {
      setIsNicknameChanged(true);
    } else {
      setIsNicknameChanged(false);
    }
    setIsNicknameSuccess(false);
  }, [value, defaultValue, setIsNicknameChanged, setIsNicknameSuccess]);

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
              S.getButtonStyling(value, defaultValue),
            ]}
          >
            확인
          </Button>
        }
      />
    </div>
  );
};

export default InputInfoNickname;
