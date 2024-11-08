import { getMyBookmark } from '@/api/mypages';
import { MyBookmark } from '@/types/mypages';
import { MyContentItem } from '@/components/organisms/MyContentList/MyContentList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useMyBookmarksQuery = () => {
  const {
    data: myBookmarksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyBookmark>(
    ['myBookmarks'],
    ({ pageParam = 0 }) => getMyBookmark(pageParam, 20),
    (data) => {
      const firstPage = data.pages[0];
      return {
        content: data.pages.flatMap((page) =>
          page.content.map((item: MyContentItem) => ({
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
    myBookmarks: myBookmarksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
