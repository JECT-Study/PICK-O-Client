import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { ERROR } from '@/constants/message';
import { postDoneGameBookmark } from '@/api/bookmarks';
import { GameSet } from '@/types/game';

export const useCreateDoneGameBookmarkMutation = (
  gameSetId: Id,
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postDoneGameBookmark(gameSetId),
    onMutate: () => {
      const prevGame: GameSet | undefined = queryClient.getQueryData([
        'gameSet',
        gameSetId,
      ]);

      if (prevGame) {
        queryClient.setQueryData(['gameSet', gameSetId], {
          ...prevGame,
          isEndBookmarked: true,
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
