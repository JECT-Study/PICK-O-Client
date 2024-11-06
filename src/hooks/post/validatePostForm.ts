import { ERROR } from '@/constants/message';
import { TalkPickField } from '@/types/talk-pick';
import { isEmptyString, isLongerThan } from '@/utils/validator';

export const validatePostForm = (field: TalkPickField) => {
  if (isEmptyString(field.title)) {
    return { message: ERROR.CREATE.EMPTY_TITLE, isValid: false };
  }
  if (isEmptyString(field.optionA) || isEmptyString(field.optionB)) {
    return { message: ERROR.CREATE.EMPTY_OPTION, isValid: false };
  }
  if (isEmptyString(field.content)) {
    return { message: ERROR.CREATE.EMPTY_CONTENT, isValid: false };
  }
  if (isLongerThan(field.optionA, 10) || isLongerThan(field.optionB, 10)) {
    return { message: '', isValid: false };
  }
  return { message: '', isValid: true };
};
