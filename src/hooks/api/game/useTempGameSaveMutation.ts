import { TempGame } from '@/types/game';
import { postTempGame } from '@/api/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveTempGameMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (tempGameData: TempGame) => postTempGame(tempGameData),
    onSuccess: async (response) => {
      console.log('임시 저장 성공:', response.data);
      await queryClient.invalidateQueries({
        queryKey: ['tempGames'],
      });
    },
    onError: (error) => {
      console.error('임시 저장 실패:', error);
    },
  });

  const handleSaveTempGame = async (tempGameData: TempGame) => {
    try {
      await mutation.mutateAsync(tempGameData);
      console.log('임시 저장 요청 성공:', tempGameData);
    } catch (error) {
      console.error('임시 저장 요청 중 오류 발생:', error);
    }
  };

  return {
    handleSaveTempGame,
    data: mutation.data,
  };
};
