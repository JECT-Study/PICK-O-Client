import { getMyWritten } from '@/api/mypages';
import { MyContentItem, MyWritten } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { transformWrittenItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

export interface MyWrittenTransformedPage extends Omit<MyWritten, 'content'> {
  content: MyContentItem[];
}

export const useMyTalkPickWrittensQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<MyWritten, InfiniteData<MyWrittenTransformedPage>>(
      ['myWritten'],
      async ({ pageParam = 0 }) => {
        return getMyWritten(pageParam, 20);
      },
      (infiniteData) => {
        const newPages = infiniteData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) => transformWrittenItem(item)),
        }));

        const newInfiniteData: InfiniteData<MyWrittenTransformedPage> = {
          ...infiniteData,
          pages: newPages,
        };

        return newInfiniteData;
      },
    );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
