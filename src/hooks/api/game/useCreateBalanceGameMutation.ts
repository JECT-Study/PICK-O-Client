import { BalanceGame } from '@/types/game';
import { postBalanceGame } from '@/api/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBalanceGameMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gameData: BalanceGame) => postBalanceGame(gameData),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const handleCreateBalanceGame = async (gameData: BalanceGame) => {
    try {
      await mutation.mutateAsync(gameData);
    } catch (error) {
      throw error;
    }
  };

  return {
    handleCreateBalanceGame,
    data: mutation.data,
  };
};
