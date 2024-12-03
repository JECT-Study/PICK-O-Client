import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Friends } from '@/types/friends';
import { postFriends } from '@/api/friends';

export const useCreateFriendsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Friends) => postFriends(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['friends'],
      }),
  });

  return { ...mutation };
};
