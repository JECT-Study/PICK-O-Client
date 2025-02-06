import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { deleteBySetId } from '@/api/game';

interface DeleteGameSetParams {
  gameSetId: Id;
}

export const useDeleteGameSetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteGameSetParams>({
    mutationFn: ({ gameSetId }) => deleteBySetId(gameSetId).then(() => {}),
    onSuccess: async (_, { gameSetId }) => {
      await queryClient.invalidateQueries({ queryKey: ['gameSet', gameSetId] });
    },
  });
};
