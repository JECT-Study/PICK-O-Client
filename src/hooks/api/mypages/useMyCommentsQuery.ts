import { getMyComment } from '@/api/mypages';
import { MyComment, CommentInfoItemResponse } from '@/types/mypages';
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
          page.content.map((item: CommentInfoItemResponse) => ({
            ...item,
            content: item.commentContent,
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
