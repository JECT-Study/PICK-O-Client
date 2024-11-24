import { postEmailVerify } from '@/api/email';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR, SUCCESS } from '@/constants/message';
import { MemberVerifyForm } from '@/types/member';
import { isEmptyString } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

export const useCheckCode = (
  value: MemberVerifyForm,
  sendSuccess: boolean,
  handleVerifySuccess?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);
  const emailVerify = useMutation({
    mutationFn: () => postEmailVerify(value),
    onSuccess: () => {
      setIsError(false);
      setErrorMessage(SUCCESS.CODE.MATCH);
      handleVerifySuccess?.(true);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.BAD_REQUEST) {
        setIsError(true);
        setErrorMessage(ERROR.CODE.NOT_MATCH);
      }
    },
  });

  const handleSubmit = () => {
    if (!sendSuccess) return;

    if (isEmptyString(value.verificationCode)) {
      setIsError(true);
      setErrorMessage(ERROR.CODE.EMPTY);
      return;
    }
    emailVerify.mutate();
  };

  return { inputRef, isError, errorMessage, handleSubmit };
};
