import { BalanceGame } from '@/types/game';
import { postBalanceGame } from '@/api/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBalanceGameMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gameData: BalanceGame) => postBalanceGame(gameData),
    onSuccess: async (response) => {
      console.log('게임 생성 성공:', response.data);
      await queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
    onError: (error) => {
      console.error('게임 생성 실패:', error);
    },
  });

  const handleCreateBalanceGame = async (gameData: BalanceGame) => {
    try {
      await mutation.mutateAsync(gameData);
      console.log('게임 생성 요청 성공:', gameData);
    } catch (error) {
      console.error('게임 생성 요청 중 오류 발생:', error);
    }
  };

  return {
    handleCreateBalanceGame,
    data: mutation.data,
  };
};
