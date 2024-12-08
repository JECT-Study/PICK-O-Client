import { MemberForm, MemberSuccesForm } from '@/types/member';
import { isAllTrue } from '@/utils/validator';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api/member/useSignUpMutation';
import { useActiveSubmit } from '../common/useActiveSubmit';
import { useFocusFalse } from '../common/useFocusFalse';
import useInputs from '../common/useInputs';
import useToastModal from '../modal/useToastModal';

const initialState: MemberForm = {
  email: '',
  verificationCode: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  profileImgId: null,
  role: 'USER',
};

const successState: MemberSuccesForm = {
  email: false,
  verificationCode: false,
  nickname: false,
  password: false,
  passwordConfirm: false,
};

export const useSignupForm = () => {
  const { form, onChange, setEach } = useInputs<MemberForm>(initialState);
  const { successForm, onSuccessChange } =
    useActiveSubmit<MemberSuccesForm>(successState);

  const { focus } = useFocusFalse<MemberSuccesForm>(successForm);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const createNewForm = (prevForm: MemberForm) => {
    const { verificationCode, ...newForm } = prevForm;
    return newForm;
  };

  const { mutate: signup } = useSignUpMutation(showToastModal);

  const navigate = useNavigate();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllTrue(successForm)) {
      const newForm = createNewForm(form);
      signup(newForm);
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
    setEach,
    onSuccessChange,
    isVisible,
    modalText,
    handleSubmit,
    handleCancel,
  };
};
