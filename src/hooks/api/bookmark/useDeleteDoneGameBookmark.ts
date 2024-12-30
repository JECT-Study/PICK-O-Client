import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { ERROR } from '@/constants/message';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { GameSet } from '@/types/game';

export const useDeleteDoneGameBookmarkMutation = (
  gameSetId: Id,
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteDoneGameBookmark(gameSetId),
    onMutate: () => {
      const prevGame: GameSet | undefined = queryClient.getQueryData([
        'gameSet',
        gameSetId,
      ]);

      if (prevGame) {
        queryClient.setQueryData(['gameSet', gameSetId], {
          ...prevGame,
          isEndBookmarked: false,
        });
      }

      return { prevGame };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['gameSet', gameSetId], context?.prevGame);
      showToastModal(ERROR.BOOKMARK.GAME_DELETE_FAIL);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['gameSet', gameSetId],
      }),
  });
};
