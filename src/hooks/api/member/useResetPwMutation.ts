import { useMutation } from '@tanstack/react-query';
import { postPasswordReset } from '@/api/email';
import { MemberResetForm } from '@/types/member';

export const useResetPwMutation = () => {
  const mutation = useMutation({
    mutationFn: (
      data: Pick<MemberResetForm, 'email' | 'password' | 'passwordConfirm'>,
    ) => postPasswordReset(data),
  });

  return { ...mutation };
};
