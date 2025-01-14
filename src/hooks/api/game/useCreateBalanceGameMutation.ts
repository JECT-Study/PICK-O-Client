import { BalanceGame } from '@/types/game';
import { postBalanceGame } from '@/api/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBalanceGameMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gameData: BalanceGame) => {
      const response = await postBalanceGame(gameData);
      return response.data;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
    onError: (error) => {
      console.error('게임 생성 실패:', error);
    },
  });

  const handleCreateBalanceGame = async (
    gameData: BalanceGame,
  ): Promise<number> => {
    try {
      const gameId = await mutation.mutateAsync(gameData);
      return gameId;
    } catch (error) {
      console.error('게임 생성 중 오류 발생:', error);
      throw error;
    }
  };

  return {
    handleCreateBalanceGame,
    data: mutation.data,
    isError: mutation.isError,
    error: mutation.error,
  };
};
