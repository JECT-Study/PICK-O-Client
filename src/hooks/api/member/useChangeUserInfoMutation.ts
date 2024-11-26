import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { putMemberInfo } from '@/api/member';
import {
  MemberEditForm,
  MemberEditNicknameForm,
  MemberEditProfileImgForm,
} from '@/types/member';

export const useChangeUserInfoMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (
      data: MemberEditForm | MemberEditNicknameForm | MemberEditProfileImgForm,
    ) => putMemberInfo(data),
    onSuccess: () => {
      showToastModal('수정 완료 되었습니다!', () => {
        navigate(`/`);
      });
    },
  });

  return { ...mutation };
};
