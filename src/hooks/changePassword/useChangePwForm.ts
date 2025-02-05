import { MemberResetForm, MemberSuccesForm } from '@/types/member';
import { isAllTrue } from '@/utils/validator';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPwMutation } from '../api/member/useResetPwMutation';
import { useActiveSubmit } from '../common/useActiveSubmit';
import { useFocusFalse } from '../common/useFocusFalse';
import useInputs from '../common/useInputs';
import useToastModal from '../modal/useToastModal';

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
  const { form, onChange } = useInputs<MemberResetForm>(initialState);
  const { successForm, onSuccessChange } =
    useActiveSubmit<MemberSuccesForm>(successState);

  const { focus } = useFocusFalse<MemberSuccesForm>(successForm);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const createNewForm = (prevForm: MemberResetForm) => {
    const { verificationCode, ...newForm } = prevForm;
    return newForm;
  };

  const { mutate: resetPassword } = useResetPwMutation(showToastModal);

  const navigate = useNavigate();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllTrue(successForm)) {
      const newForm = createNewForm(form);
      resetPassword(newForm);
    } else {
      focus(e);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    form,
    onChange,
    onSuccessChange,
    isVisible,
    modalText,
    handleSubmit,
    handleCancel,
  };
};
