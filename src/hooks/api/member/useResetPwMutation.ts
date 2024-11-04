// import { AxiosErrorResponse } from '@/api/interceptor';
import { postPasswordReset } from '@/api/email';
import { useMutation } from '@tanstack/react-query';
import { MemberResetForm } from '@/types/member';

export const useResetPwMutation = () => {
  const mutation = useMutation({
    mutationFn: (
      data: Pick<MemberResetForm, 'email' | 'password' | 'passwordConfirm'>,
    ) => postPasswordReset(data),
    onSuccess: () => {},
    onError: () => {},
  });

  return { ...mutation };
};
