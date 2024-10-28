import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { GameSet } from '@/types/game';
import { deleteGameBookmark } from '@/api/bookmarks';

export const useDeleteGameBookmarkMutation = (gameSetId: Id, gameId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteGameBookmark(gameSetId),
    onMutate: () => {
      const prevGame: GameSet | undefined = queryClient.getQueryData([
        'gameSet',
        gameSetId,
      ]);

      if (prevGame) {
        queryClient.setQueryData(['gameSet', gameSetId], {
          ...prevGame,
          gameDetailResponses: prevGame.gameDetailResponses.map((gameDetail) =>
            gameDetail.id === gameId
              ? {
                  ...gameDetail,
                  myBookmark: false,
                }
              : gameDetail,
          ),
        });
      }

      return { prevGame };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['gameSet', gameSetId], context?.prevGame);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['gameSet', gameSetId],
      }),
  });
};
