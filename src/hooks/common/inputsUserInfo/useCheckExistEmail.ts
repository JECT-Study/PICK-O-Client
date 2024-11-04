import { postResetCode } from '@/api/email';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR, SUCCESS } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

export const useCheckExistEmail = (value: string) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);

  const isValidEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const verifyEmail = useMutation({
    mutationFn: () => postResetCode(value),
    onSuccess: () => {
      setIsError(false);
      setErrorMessage(SUCCESS.EMAIL.AVAILABLE);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.NOT_FOUND) {
        setIsError(true);
        setErrorMessage(ERROR.EMAIL.NOT_EXIST);
      }
    },
  });

  const handleSubmit = () => {
    if (isEmptyString(value)) {
      setIsError(true);
      setErrorMessage(ERROR.EMAIL.EMPTY);
    } else if (!isValidEmailFormat(value)) {
      setIsError(true);
      setErrorMessage(ERROR.EMAIL.FORM);
    } else {
      verifyEmail.mutate();
    }
  };

  return { inputRef, isError, errorMessage, handleSubmit };
};
