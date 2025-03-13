import { getMyWritten } from '@/api/mypages';
import { MyContentItem, MyWritten } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { transformWrittenItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

export interface MyWrittenTransformedPage extends Omit<MyWritten, 'content'> {
  content: MyContentItem[];
}

export const useMyTalkPickWrittensQuery = (
  options?: Parameters<
    typeof useInfiniteScroll<MyWritten, InfiniteData<MyWrittenTransformedPage>>
  >[3],
) => {
  return useInfiniteScroll<MyWritten, InfiniteData<MyWrittenTransformedPage>>(
    ['myWritten'] as const,
    async ({ pageParam = 0 }) => {
      return getMyWritten(pageParam, 20);
    },
    (infiniteData: InfiniteData<MyWritten>) => {
      const newPages = infiniteData.pages.map((page) => ({
        ...page,
        content: page.content.map((item) => transformWrittenItem(item)),
      }));
      return {
        ...infiniteData,
        pages: newPages,
      };
    },
    options,
  );
};
