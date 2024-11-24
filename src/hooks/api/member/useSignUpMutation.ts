import { postMember } from '@/api/member';
import { PATH } from '@/constants/path';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignUpMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postMember,
    onSuccess: () => {
      showToastModal('회원가입 완료!', () => {
        navigate(`/${PATH.LOGIN}`);
      });
    },
  });

  return { ...mutation };
};
