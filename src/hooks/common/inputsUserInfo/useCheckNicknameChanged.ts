import { useRef, useState } from 'react';
import { AxiosErrorResponse } from '@/api/interceptor';
import { getNicknameVerify } from '@/api/member';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR, SUCCESS } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';

export const useCheckNicknameChanged = (
  value: string,
  defaultValue: string,
  setIsNicknameSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);

  function isValidNickname(nickname: string): boolean {
    return nickname.length >= 2 && nickname.length <= 10;
  }

  const nicknameVerify = useMutation({
    mutationFn: () => getNicknameVerify(value),
    onSuccess: () => {
      setIsError(false);
      setErrorMessage(SUCCESS.NICKNAME.AVAILABLE);
      setIsNicknameSuccess(true);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.CONFLICT) {
        setIsError(true);
        setErrorMessage(ERROR.NICKNAME.EXIST);
        setIsNicknameSuccess(false);
      }
    },
  });

  const handleSubmit = () => {
    if (isEmptyString(value)) {
      return;
    }

    if (value === defaultValue) {
      return;
    }

    if (!isValidNickname(value)) {
      setIsError(true);
      setErrorMessage(ERROR.NICKNAME.FORM);
    } else {
      nicknameVerify.mutate();
    }
  };

  return { inputRef, isError, errorMessage, handleSubmit };
};
