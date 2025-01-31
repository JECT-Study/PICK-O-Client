import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
import { GameContent } from '@/types/game';

/**
 * 북마크 Mutation 함수 타입
 */
type BookmarkMutationFn = (
  gameId: Id,
) => Promise<AxiosResponse<ServerResponse>>;

/**
 * @param activeTab 예: 'ALL' | 'TODAY'...
 * @param bookmarkMutationFn postDoneGameBookmark or deleteDoneGameBookmark
 * @param nextBookmarkedValue true(생성) or false(삭제)
 */
export const useLandingPageBookmarkMutation = (
  activeTab: string,
  bookmarkMutationFn: BookmarkMutationFn,
  nextBookmarkedValue: boolean,
) => {
  const queryClient = useQueryClient();

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

        if (prevBest) {
          const updatedBest = prevBest.map((item) =>
            item.id === gameId
              ? { ...item, bookmarked: nextBookmarkedValue }
              : item,
          );
          queryClient.setQueryData(['bestGames', activeTab], updatedBest);
        }
        if (prevLatest) {
          const updatedLatest = prevLatest.map((item) =>
            item.id === gameId
              ? { ...item, bookmarked: nextBookmarkedValue }
              : item,
          );
          queryClient.setQueryData(['latestGames', activeTab], updatedLatest);
        }

        return {
          bestGames: prevBest,
          latestGames: prevLatest,
        };
      },

      onError: (_error, gameId, context) => {
        if (context?.bestGames) {
          queryClient.setQueryData(['bestGames', activeTab], context.bestGames);
        }
        if (context?.latestGames) {
          queryClient.setQueryData(
            ['latestGames', activeTab],
            context.latestGames,
          );
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
