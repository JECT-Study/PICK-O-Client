import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTempGame } from '@/api/game';
import { TempGame } from '@/types/game';

export const useSaveTempGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tempGameData: TempGame) => postTempGame(tempGameData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tempGame'],
      });
      console.log('임시 저장 성공 및 캐시 무효화 완료');
    },
    onError: (error) => {
      console.error('임시 저장 실패:', error);
    },
  });
};
