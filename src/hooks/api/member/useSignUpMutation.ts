import { postMember } from '@/api/member';
import { PATH } from '@/constants/path';
import { SUCCESS } from '@/constants/message';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignUpMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postMember,
    onSuccess: () => {
      showToastModal(SUCCESS.SIGN_UP, () => {
        navigate(`/${PATH.LOGIN}`);
      });
    },
  });

  return { ...mutation };
};
