import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTempGame } from '@/api/game';
import { TempGame } from '@/types/game';

export const useSaveTempGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tempGameData: TempGame) => {
      return postTempGame(tempGameData);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['tempGame'],
      });
    },
    onError: (error) => {
      console.error('임시 저장 실패:', error);
    },
  });
};
