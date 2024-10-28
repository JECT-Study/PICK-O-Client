import { Id } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameSet } from '@/types/game';
import { deleteGameVote } from '@/api/vote';

export const useDeleteGameVoteMutation = (gameSetId: Id, gameId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteGameVote(gameId),
    onMutate: () => {
      const prevGame: GameSet | undefined = queryClient.getQueryData([
        'gameSet',
        gameSetId,
      ]);

      if (prevGame) {
        const votedGameDetail = prevGame.gameDetailResponses.find(
          (gameDetail) => gameDetail.id === gameId,
        );

        if (votedGameDetail) {
          const { votedOption, votesCountOfOptionA, votesCountOfOptionB } =
            votedGameDetail;

          queryClient.setQueryData(['gameSet', gameSetId], {
            ...prevGame,
            gameDetailResponses: prevGame.gameDetailResponses.map(
              (gameDetail) =>
                gameDetail.id === gameId
                  ? {
                      ...gameDetail,
                      votedOption: null,
                      votesCountOfOptionA:
                        votedOption === 'A'
                          ? votesCountOfOptionA - 1
                          : votesCountOfOptionA,
                      votesCountOfOptionB:
                        votedOption === 'B'
                          ? votesCountOfOptionB - 1
                          : votesCountOfOptionB,
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
