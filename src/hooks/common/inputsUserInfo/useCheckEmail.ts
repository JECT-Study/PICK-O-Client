import { useEffect, useRef, useState } from 'react';
import { postSignUpCode } from '@/api/email';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR, SUCCESS } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';

export const useCheckEmail = (
  value: string,
  handleSendSuccess?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsError(true);
    setErrorMessage(undefined);
  }, [value]);

  const isValidEmailFormat = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const emailRequest = useMutation({
    mutationFn: () => {
      setIsError(false);
      setErrorMessage(undefined);
      return postSignUpCode(value);
    },
    onSuccess: () => {
      setIsError(false);
      setErrorMessage(SUCCESS.EMAIL.AVAILABLE);
      handleSendSuccess?.(true);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.CONFLICT) {
        setIsError(true);
        setErrorMessage(ERROR.EMAIL.EXIST);
      }
    },
  });

  const handleSubmit = () => {
    if (isEmptyString(value)) {
      return;
    }

    if (!isValidEmailFormat(value)) {
      setIsError(true);
      setErrorMessage(ERROR.EMAIL.FORM);
    } else {
      emailRequest.mutate();
    }
  };

  return { inputRef, isError, errorMessage, handleSubmit };
};
