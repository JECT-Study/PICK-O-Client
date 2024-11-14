import { useMutation } from '@tanstack/react-query';
import { postPasswordReset } from '@/api/email';
import { MemberResetPwForm } from '@/types/member';

export const useResetPwMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: MemberResetPwForm) => postPasswordReset(data),
  });

  return { ...mutation };
};
