import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postPasswordReset } from '@/api/email';
import { MemberResetPwForm } from '@/types/member';
import { PATH } from '@/constants/path';

export const useResetPwMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: MemberResetPwForm) => postPasswordReset(data),
    onSuccess: () => {
      showToastModal('변경 완료!', () => {
        navigate(`/${PATH.LOGIN}`);
      });
    },
  });

  return { ...mutation };
};
