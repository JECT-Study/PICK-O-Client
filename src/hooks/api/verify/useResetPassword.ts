import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberResetForm } from '@/types/member';
import { postResetPassword } from '@/api/verify';

export const useSendEmailCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MemberResetForm) => postResetPassword(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['resetPassword'],
      }),
  });

  return { ...mutation };
};
