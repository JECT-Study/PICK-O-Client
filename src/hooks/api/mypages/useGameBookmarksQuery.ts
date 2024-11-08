import { getGameBookmark } from '@/api/mypages';
import { GameBookmark } from '@/types/mypages';
import { MyBalanceGameItem } from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useGameBookmarksQuery = () => {
  const {
    data: gameBookmarksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<GameBookmark>(
    ['gameBookmark'],
    ({ pageParam = 0 }) => getGameBookmark(pageParam, 20),
    (data) => {
      const firstPage = data.pages[0];
      return {
        content: data.pages.flatMap((page) =>
          page.content.map((item: MyBalanceGameItem) => ({
            ...item,
            showBookmark: true,
          })),
        ),
        pageable: firstPage.pageable,
        totalPages: firstPage.totalPages,
        totalElements: firstPage.totalElements,
        last: firstPage.last,
        size: firstPage.size,
        number: firstPage.number,
        sort: firstPage.sort,
        numberOfElements: firstPage.numberOfElements,
        first: firstPage.first,
        empty: firstPage.empty,
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
