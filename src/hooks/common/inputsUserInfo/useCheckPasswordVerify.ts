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
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      }
    },
  });

  const handleSubmit = () => {
    if (isEmptyString(value)) {
      setIsError(true);
      setErrorMessage(ERROR.PW.EMPTY);
      return;
    }

    passwordVerify.mutate();
  };

  return { inputRef, isError, errorMessage, handleSubmit };
};
