import { getGameWritten } from '@/api/mypages';
import { GameWritten } from '@/types/mypages';
import { MyBalanceGameItem } from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useGameWrittensQuery = () => {
  const {
    data: gameWrittensData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<GameWritten>(
    ['gameWritten'],
    ({ pageParam = 0 }) => getGameWritten(pageParam, 20),
    (data) => {
      const firstPage = data.pages[0];
      return {
        content: data.pages.flatMap((page) =>
          page.content.map((item: MyBalanceGameItem) => ({
            ...item,
            showBookmark: false,
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
    gameWritten: gameWrittensData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
