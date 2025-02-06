import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { BalanceGame } from '@/types/game';
import { putGameBySetId } from '@/api/game';

interface UpdateGameParams {
  gameSetId: Id;
  data: BalanceGame;
}

export const useEditGamesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<BalanceGame, Error, UpdateGameParams>({
    mutationFn: ({ gameSetId, data }) => putGameBySetId(gameSetId, data),
    onSuccess: async (_, { gameSetId }) => {
      await queryClient.invalidateQueries({ queryKey: ['gameSet', gameSetId] });
    },
  });
};
