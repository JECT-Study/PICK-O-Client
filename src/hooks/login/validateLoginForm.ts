import { ERROR } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';

const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPwFormat = (pw: string): boolean => {
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{10,20}$/;
  return pwRegex.test(pw);
};

export const validateLoginForm = (form: {
  email: string;
  password: string;
}) => {
  if (isEmptyString(form.email)) {
    return { isValid: false, message: ERROR.EMAIL.EMPTY };
  }
  if (!isValidEmailFormat(form.email)) {
    return { isValid: false, message: ERROR.EMAIL.FORM };
  }
  if (isEmptyString(form.password)) {
    return { isValid: false, message: ERROR.PW.EMPTY };
  }
  if (!isValidPwFormat(form.password)) {
    return { isValid: false, message: ERROR.PW.FORM };
  }
  return { isValid: true, message: '' };
};
