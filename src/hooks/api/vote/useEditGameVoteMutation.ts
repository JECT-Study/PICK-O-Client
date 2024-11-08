import { Id } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameSet } from '@/types/game';
import { VoteOption } from '@/types/vote';
import { putGameVote } from '@/api/vote';

export const useEditGameVoteMutation = (gameSetId: Id, gameId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VoteOption) => putGameVote(gameId, data),
    onMutate: (data: VoteOption) => {
      const prevGame: GameSet | undefined = queryClient.getQueryData([
        'gameSet',
        gameSetId,
      ]);

      if (prevGame) {
        const votedGameDetail = prevGame.gameDetailResponses.find(
          (gameDetail) => gameDetail.id === gameId,
        );

        if (votedGameDetail) {
          const { votesCountOfOptionA, votesCountOfOptionB } = votedGameDetail;

          queryClient.setQueryData(['gameSet', gameSetId], {
            ...prevGame,
            gameDetailResponses: prevGame.gameDetailResponses.map(
              (gameDetail) =>
                gameDetail.id === gameId
                  ? {
                      ...gameDetail,
                      votedOption: data,
                      votesCountOfOptionA:
                        data === 'A'
                          ? votesCountOfOptionA + 1
                          : votesCountOfOptionA - 1,
                      votesCountOfOptionB:
                        data === 'B'
                          ? votesCountOfOptionB + 1
                          : votesCountOfOptionB - 1,
                    }
                  : gameDetail,
            ),
          });
        }
      }

      return { prevGame };
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['gameVote', gameId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['gameSet', gameSetId],
        }),
      ]),
    onError: (err, id, context) => {
      queryClient.setQueryData(['gameSet', gameSetId], context?.prevGame);
    },
  });
};
