import { getGameVote } from '@/api/mypages';
import { GameVote } from '@/types/mypages';
import { MyBalanceGameItem } from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useGameVotesQuery = () => {
  const {
    data: gameVotesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<GameVote>(
    ['gameVote'],
    ({ pageParam = 0 }) => getGameVote(pageParam, 20),
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
    gameVote: gameVotesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
