import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id } from '@/types/api';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { GameSet } from '@/types/game';

export const useDeleteDoneGameBookmarkMutation = (gameSetId: Id) => {
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
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['gameSet', gameSetId],
      }),
  });
};
