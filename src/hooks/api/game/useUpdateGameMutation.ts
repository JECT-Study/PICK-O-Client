import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { BalanceGame } from '@/types/game';
import { updateGameBySetId } from '@/api/game';

interface UpdateGameParams {
  gameSetId: Id;
  data: BalanceGame;
}

export const useUpdateGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<BalanceGame, Error, UpdateGameParams>({
    mutationFn: ({ gameSetId, data }) => updateGameBySetId(gameSetId, data),
    onSuccess: async (_, { gameSetId }) => {
      await queryClient.invalidateQueries({ queryKey: ['gameSet', gameSetId] });
    },
  });
};
