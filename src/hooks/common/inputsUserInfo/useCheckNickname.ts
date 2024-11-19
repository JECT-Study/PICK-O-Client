import { AxiosErrorResponse } from '@/api/interceptor';
import { getNicknameVerify } from '@/api/member';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR, SUCCESS } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

export const useCheckNickname = (value: string) => {
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
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.CONFLICT) {
        setIsError(true);
        setErrorMessage(ERROR.NICKNAME.EXIST);
      }
    },
  });

  const handleSubmit = () => {
    if (isEmptyString(value)) {
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
