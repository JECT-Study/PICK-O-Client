import { ERROR } from '@/constants/message';
import { isEmptyString, isLongerThan } from '@/utils/validator';

export const validatePostForm = (
  title: string,
  optionA: string,
  optionB: string,
  content: string,
) => {
  if (isEmptyString(title)) {
    return { message: ERROR.CREATE.EMPTY_TITLE, isValid: false };
  }
  if (isEmptyString(optionA) || isEmptyString(optionB)) {
    return { message: ERROR.CREATE.EMPTY_OPTION, isValid: false };
  }
  if (isEmptyString(content)) {
    return { message: ERROR.CREATE.EMPTY_CONTENT, isValid: false };
  }
  if (isLongerThan(optionA, 10) || isLongerThan(optionB, 10)) {
    return { message: '', isValid: false };
  }
  return { message: '', isValid: true };
};
