import { PATH } from '@/constants/path';
import { MemberResetForm, MemberSuccesForm } from '@/types/member';
import { isAllTrue } from '@/utils/validator';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPwMutation } from '../api/member/useResetPwMutation';
import { useActiveSubmit } from '../common/useActiveSubmit';
import { useFocusFalse } from '../common/useFocusFalse';
import useInputs from '../common/useInputs';

const initialState: MemberResetForm = {
  email: '',
  verificationCode: '',
  password: '',
  passwordConfirm: '',
};

const successState: MemberSuccesForm = {
  email: false,
  verificationCode: false,
  password: false,
  passwordConfirm: false,
};

export const useChangePwForm = () => {
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const { form, onChange } = useInputs<MemberResetForm>(initialState);
  const { successForm, onSuccessChange } =
    useActiveSubmit<MemberSuccesForm>(successState);

  const { focus } = useFocusFalse<MemberSuccesForm>(successForm);

  const createNewForm = (prevForm: MemberResetForm) => {
    const { verificationCode, ...newForm } = prevForm;
    return newForm;
  };

  const { mutate: resetPassword } = useResetPwMutation();

  const navigate = useNavigate();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllTrue(successForm)) {
      const newForm = createNewForm(form);
      resetPassword(newForm, {
        onSuccess: () => {
          setResetSuccess(true);
          setTimeout(() => {
            navigate(`/${PATH.LOGIN}`);
          }, 2000);
        },
      });
    } else {
      focus(e);
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return {
    resetSuccess,
    form,
    onChange,
    onSuccessChange,
    handleSubmit,
    handleCancle,
  };
};
