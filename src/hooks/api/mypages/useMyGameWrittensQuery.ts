import { getGameWritten } from '@/api/mypages';
import { GameWritten, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformGameWrittenItem } from '@/utils/transformBalanceGame';

export interface GameWrittenTransformedPage
  extends Omit<GameWritten, 'content'> {
  content: MyBalanceGameItem[];
}

export const useMyGameWrittensQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<GameWritten, InfiniteData<GameWrittenTransformedPage>>(
      ['gameWritten'],
      async ({ pageParam = 0 }) => {
        return getGameWritten(pageParam, 20);
      },
      (infiniteData: InfiniteData<GameWritten>) => {
        const newPages = infiniteData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) => transformGameWrittenItem(item)),
        }));

        return {
          ...infiniteData,
          pages: newPages,
        };
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
