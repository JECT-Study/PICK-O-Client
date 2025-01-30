import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { getMyBookmark } from '@/api/mypages';
import { MyBookmark, MyContentItem } from '@/types/mypages';
import { transformBookmarkItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

export interface MyBookmarkTransformedPage extends Omit<MyBookmark, 'content'> {
  content: MyContentItem[];
}

export const useMyTalkPickBookmarksQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<MyBookmark, InfiniteData<MyBookmarkTransformedPage>>(
      ['myBookmarks'],

      async ({ pageParam = 0 }) => {
        return getMyBookmark(pageParam, 20);
      },

      (infiniteData) => {
        const newPages = infiniteData.pages.map((page) => {
          const transformedContent: MyContentItem[] = page.content.map(
            transformBookmarkItem,
          );

          return {
            ...page,
            content: transformedContent,
          };
        });

        const newInfiniteData: InfiniteData<MyBookmarkTransformedPage> = {
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
