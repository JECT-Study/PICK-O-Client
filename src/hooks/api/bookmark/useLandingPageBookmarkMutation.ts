import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
import { GameContent } from '@/types/game';

type BookmarkMutationFn = (
  gameId: Id,
) => Promise<AxiosResponse<ServerResponse>>;

export const useLandingPageBookmarkMutation = (
  activeTab: string,
  bookmarkMutationFn: BookmarkMutationFn,
  nextBookmarkedValue: boolean,
) => {
  const queryClient = useQueryClient();

  const updateGameBookmark = (
    queryKey: [string, string],
    prevData: GameContent[] | undefined,
    gameId: Id,
    nextValue: boolean,
  ) => {
    if (!prevData) return;
    const updated = prevData.map((item) =>
      item.id === gameId ? { ...item, bookmarked: nextValue } : item,
    );
    queryClient.setQueryData(queryKey, updated);
  };

  const rollbackGameBookmark = (
    queryKey: [string, string],
    prevData: GameContent[] | undefined,
  ) => {
    if (!prevData) return;
    queryClient.setQueryData(queryKey, prevData);
  };

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn: bookmarkMutationFn,

      onMutate: (gameId: Id) => {
        const prevBest = queryClient.getQueryData<GameContent[]>([
          'bestGames',
          activeTab,
        ]);
        const prevLatest = queryClient.getQueryData<GameContent[]>([
          'latestGames',
          activeTab,
        ]);

        updateGameBookmark(
          ['bestGames', activeTab],
          prevBest,
          gameId,
          nextBookmarkedValue,
        );
        updateGameBookmark(
          ['latestGames', activeTab],
          prevLatest,
          gameId,
          nextBookmarkedValue,
        );

        return { bestGames: prevBest, latestGames: prevLatest };
      },

      onError: (_error, gameId, context) => {
        if (context?.bestGames) {
          rollbackGameBookmark(['bestGames', activeTab], context.bestGames);
        }
        if (context?.latestGames) {
          rollbackGameBookmark(['latestGames', activeTab], context.latestGames);
        }
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['bestGames', activeTab],
        });
        await queryClient.invalidateQueries({
          queryKey: ['latestGames', activeTab],
        });
      },
    },
  );
};
