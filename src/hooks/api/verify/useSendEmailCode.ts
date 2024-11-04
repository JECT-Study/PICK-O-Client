import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberForm } from '@/types/member';
import { postEmailCode } from '@/api/verify';

export const useSendEmailCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Pick<MemberForm, 'email'>) => postEmailCode(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['emailVerify'],
      }),
  });

  return { ...mutation };
};
