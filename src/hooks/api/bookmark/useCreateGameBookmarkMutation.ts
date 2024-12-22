import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { ERROR } from '@/constants/message';
import { GameSet } from '@/types/game';
import { postGameBookmark } from '@/api/bookmarks';

export const useCreateGameBookmarkMutation = (
  gameSetId: Id,
  gameId: Id,
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postGameBookmark(gameSetId, gameId),
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
                  myBookmark: true,
                }
              : gameDetail,
          ),
        });
      }

      return { prevGame };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['gameSet', gameSetId], context?.prevGame);
      showToastModal(ERROR.BOOKMARK.GAME_FAIL);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['gameSet', gameSetId],
      }),
  });
};
