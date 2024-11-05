import { TempGame } from '@/types/game';
import { postTempGame } from '@/api/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveTempGameMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (tempGameData: TempGame) => postTempGame(tempGameData),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['tempGames'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const handleSaveTempGame = async (tempGameData: TempGame) => {
    try {
      await mutation.mutateAsync(tempGameData);
    } catch (error) {
      throw error;
    }
  };

  return {
    handleSaveTempGame,
    data: mutation.data,
  };
};
