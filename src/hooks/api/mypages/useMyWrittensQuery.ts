import { getMyWritten } from '@/api/mypages';
import { MyWritten } from '@/types/mypages';
import { MyContentItem } from '@/components/organisms/MyContentList/MyContentList';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';

export const useMyWrittensQuery = () => {
  const {
    data: myWrittenData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyWritten>(
    ['myWritten'],
    ({ pageParam = 0 }) => getMyWritten(pageParam, 20),
    (data) => {
      const firstPage = data.pages[0];
      return {
        content: data.pages.flatMap((page) =>
          page.content.map((item: MyContentItem) => ({
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
    myWritten: myWrittenData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
