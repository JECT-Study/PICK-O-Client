import {
  MemberEditForm,
  MemberEditNicknameForm,
  MemberEditProfileImgForm,
} from '@/types/member';
import { SUCCESS } from '@/constants/message';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { putMemberInfo } from '@/api/member';

export const useChangeUserInfoMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (
      data: MemberEditForm | MemberEditNicknameForm | MemberEditProfileImgForm,
    ) => putMemberInfo(data),
    onSuccess: () => {
      showToastModal(SUCCESS.EDIT_PROFILE, () => {
        navigate(`/`);
      });
    },
  });

  return { ...mutation };
};
