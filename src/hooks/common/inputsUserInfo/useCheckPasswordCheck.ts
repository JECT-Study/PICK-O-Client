import { useRef, useState } from 'react';
import { isEmptyString } from '@/utils/validator';
import { ERROR } from '@/constants/message';

interface CheckPwChkProps {
  value: string;
  pw: string;
}

export const useCheckPasswordCheck = ({ value, pw }: CheckPwChkProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);

  const isValidPwChkMatch = (pwChk: string): boolean => {
    return pwChk === pw;
  };

  const handleVerify = () => {
    if (isEmptyString(value)) {
      return;
    }

    if (!isValidPwChkMatch(value)) {
      setIsError(true);
      setErrorMessage(ERROR.PW.NOT_MATCH);
    } else {
      setIsError(false);
      setErrorMessage(undefined);
    }
  };

  return { inputRef, isError, errorMessage, handleVerify };
};
