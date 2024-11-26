import { useState, useEffect, ChangeEvent } from 'react';
import { MemberEditForm } from '@/types/member';
import useInputs from '../common/useInputs';
import useToastModal from '../modal/useToastModal';
import { useChangeUserInfoMutation } from '../api/member/useChangeUserInfoMutation';

const initialState: MemberEditForm = {
  nickname: '',
  profileImgId: null,
};

export const useChangeUserInfoForm = (nickname?: string, memberId?: number) => {
  const { form, onChange, setEach } = useInputs<MemberEditForm>(initialState);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [isImgChanged, setIsImgChanged] = useState<boolean>(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);
  const [isNicknameSuccess, setIsNicknameSuccess] = useState<boolean>(false);

  const { mutate: changeUserInfo } = useChangeUserInfoMutation(
    showToastModal,
    memberId,
  );

  useEffect(() => {
    if (nickname) {
      setEach('nickname', nickname);
    }
  }, [nickname, setEach]);

  const handleUserInfoSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNicknameChanged && !isNicknameSuccess) {
      return;
    }

    if (isImgChanged && isNicknameChanged && isNicknameSuccess) {
      changeUserInfo(form);
    } else if (isNicknameChanged && isNicknameSuccess) {
      changeUserInfo({
        nickname: form.nickname,
      });
    } else if (isImgChanged) {
      changeUserInfo({
        profileImgId: form.profileImgId,
      });
    }
  };

  return {
    form,
    onChange,
    setEach,
    setIsImgChanged,
    setIsNicknameChanged,
    setIsNicknameSuccess,
    isVisible,
    modalText,
    handleUserInfoSubmit,
  };
};
