import { getMyVote } from '@/api/mypages';
import { MyVote } from '@/types/mypages';
import { InfoItem } from '@/components/organisms/InfoList/InfoList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useMyVotesQuery = () => {
  const {
    data: myVoteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyVote>(
    ['myVote'],
    ({ pageParam = 0 }) => getMyVote(pageParam, 20),
    (data) => {
      const firstPage = data.pages[0];
      return {
        content: data.pages.flatMap((page) =>
          page.content.map((item: InfoItem) => ({
            ...item,
            prefix: '내 선택',
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
    myVote: myVoteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
