import { getGameBookmark } from '@/api/mypages';
import { GameBookmark, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformBalanceGameItem } from '@/utils/transformBalanceGame';

type GameBookmarkTransformed = Omit<GameBookmark, 'content'> & {
  content: MyBalanceGameItem[];
};

export const useGameBookmarksQuery = () => {
  const {
    data: gameBookmarksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<GameBookmark, GameBookmarkTransformed>(
    ['gameBookmark'],

    async ({ pageParam = 0 }) => {
      return getGameBookmark(pageParam, 20);
    },

    (infiniteData: InfiniteData<GameBookmark>): GameBookmarkTransformed => {
      const firstPage = infiniteData.pages[0];
      return {
        ...firstPage,
        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformBalanceGameItem(item)),
        ),
      };
    },
  );

  return {
    gameBookmark: gameBookmarksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
