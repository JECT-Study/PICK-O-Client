import { INPUT_LIMIT } from '@/constants/input';
import { ERROR } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';
import { useRef, useState } from 'react';

export const useCheckPassword = (value: string) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isError, setIsError] = useState<boolean>(false);

  const isValidPwFormat = (pw: string): boolean => {
    const alphabetPattern = /[a-zA-Z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/;
    const isContainAlphabet = alphabetPattern.test(pw);
    const isContainNumber = numberPattern.test(pw);
    const isContainSpecialChar = specialCharPattern.test(pw);
    const isLengthValid =
      pw.length >= INPUT_LIMIT.PW_MIN && pw.length <= INPUT_LIMIT.PW_MAX;

    return (
      isContainAlphabet &&
      isContainNumber &&
      isContainSpecialChar &&
      isLengthValid
    );
  };

  const handleVerify = () => {
    if (isEmptyString(value)) {
      return;
    }

    if (!isValidPwFormat(value)) {
      setIsError(true);
      setErrorMessage(ERROR.PW.FORM);
    } else {
      setIsError(false);
      setErrorMessage(undefined);
    }
  };

  return { inputRef, isError, errorMessage, handleVerify };
};
