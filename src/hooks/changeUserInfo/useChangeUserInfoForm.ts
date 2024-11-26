import { ChangeEvent, useEffect } from 'react';
import { isAllTrue } from '@/utils/validator';
import { MemberEditForm, MemberSuccesForm } from '@/types/member';
import useInputs from '../common/useInputs';
import useToastModal from '../modal/useToastModal';
import { useChangeUserInfoMutation } from '../api/member/useChangeUserInfoMutation';
import { useActiveSubmit } from '../common/useActiveSubmit';
import { useFocusFalse } from '../common/useFocusFalse';

const initialState: MemberEditForm = {
  nickname: '',
  profileImgId: null,
};

const successState: MemberSuccesForm = {
  nickname: false,
};

export const useChangeUserInfoForm = (nickname?: string) => {
  const { form, onChange, setEach } = useInputs<MemberEditForm>(initialState);
  const { successForm, onSuccessChange } =
    useActiveSubmit<MemberSuccesForm>(successState);

  const { focus } = useFocusFalse<MemberSuccesForm>(successForm);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { mutate: changeUserInfo } = useChangeUserInfoMutation(showToastModal);

  useEffect(() => {
    if (nickname) {
      setEach('nickname', nickname);
    }
  }, [nickname, setEach]);

  const handleUserInfoSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllTrue(successForm)) {
      changeUserInfo(form);
    } else {
      focus(e);
    }
  };

  return {
    form,
    onChange,
    setEach,
    onSuccessChange,
    isVisible,
    modalText,
    handleUserInfoSubmit,
  };
};
