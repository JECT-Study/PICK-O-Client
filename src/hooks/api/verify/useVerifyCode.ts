import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MemberVerifyForm } from '@/types/member';
import { postCodeVerify } from '@/api/verify';

export const useSendEmailCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: MemberVerifyForm) => postCodeVerify(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['emailVerifyCode'],
      }),
  });

  return { ...mutation };
};
