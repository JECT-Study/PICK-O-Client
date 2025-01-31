import {
  MemberEditForm,
  MemberEditNicknameForm,
  MemberEditProfileImgForm,
} from '@/types/member';
import { SUCCESS } from '@/constants/message';
import { useNavigate } from 'react-router-dom';
import { putMemberInfo } from '@/api/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeUserInfoMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
  memberId?: number,
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      data: MemberEditForm | MemberEditNicknameForm | MemberEditProfileImgForm,
    ) => putMemberInfo(data),
    onSuccess: async () => {
      showToastModal(SUCCESS.EDIT_PROFILE, () => {
        navigate(`/`);
      });

      if (memberId) {
        await queryClient.invalidateQueries({
          queryKey: ['members'],
        });
      }
    },
  });

  return { ...mutation };
};
