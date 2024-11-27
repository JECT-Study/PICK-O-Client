import { useRef, useState } from 'react';
import { ERROR } from '@/constants/message';
import { getPasswordVerify } from '@/api/member';
import { isEmptyString } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';

export const useCheckPasswordVerify = (
  value: string,
  handleVerifySuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);

  const passwordVerify = useMutation({
    mutationFn: () => getPasswordVerify(value),
    onSuccess: (data: boolean) => {
      if (data) {
        handleVerifySuccess(true);
      } else {
        setIsError(true);
        setErrorMessage(ERROR.PW.NOT_MATCH);
      }
    },
  });

  const handlePasswordSubmit = () => {
    if (isEmptyString(value)) {
      setIsError(true);
      setErrorMessage(ERROR.PW.EMPTY);
      return;
    }

    passwordVerify.mutate();
  };

  return { inputRef, isError, errorMessage, handlePasswordSubmit };
};
