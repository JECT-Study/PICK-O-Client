import { getMyComment } from '@/api/mypages';
import { MyComment } from '@/types/mypages';
import { InfoItem } from '@/components/organisms/InfoList/InfoList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useMyCommentsQuery = () => {
  const {
    data: myCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyComment>(
    ['myComments'],
    ({ pageParam = 0 }) => getMyComment(pageParam, 20),
    (data) => {
      const firstPage = data.pages[0];
      return {
        content: data.pages.flatMap((page) =>
          page.content.map((item: InfoItem) => ({
            ...item,
            prefix: '내 댓글',
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
    myComments: myCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
