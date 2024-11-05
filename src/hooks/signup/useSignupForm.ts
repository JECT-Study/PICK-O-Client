import { PATH } from '@/constants/path';
import { MemberForm, MemberSuccesForm } from '@/types/member';
import { isAllTrue } from '@/utils/validator';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api/member/useSignUpMutation';
import { useActiveSubmit } from '../common/useActiveSubmit';
import { useFocusFalse } from '../common/useFocusFalse';
import useInputs from '../common/useInputs';

const initialState: MemberForm = {
  email: '',
  verificationCode: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  profileImgUrl: '',
  role: 'USER',
};

const successState: MemberSuccesForm = {
  email: true,
  verificationCode: true,
  nickname: true,
  password: false,
  passwordConfirm: false,
};

export const useSignupForm = () => {
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const { form, onChange, setEach } = useInputs<MemberForm>(initialState);
  const { successForm, onSuccessChange } =
    useActiveSubmit<MemberSuccesForm>(successState);

  const { focus } = useFocusFalse<MemberSuccesForm>(successForm);

  const createNewForm = (prevForm: MemberForm) => {
    const { verificationCode, ...newForm } = prevForm;
    return newForm;
  };

  const { mutate: signup } = useSignUpMutation();

  const navigate = useNavigate();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllTrue(successForm)) {
      const newForm = createNewForm(form);
      signup(newForm, {
        onSuccess: () => {
          setSignupSuccess(true);
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
    signupSuccess,
    form,
    onChange,
    setEach,
    onSuccessChange,
    handleSubmit,
    handleCancle,
  };
};
