import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { getMyBookmark } from '@/api/mypages';
import { MyBookmark, MyContentItem } from '@/types/mypages';
import { transformBookmarkItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

export interface MyBookmarkTransformedPage extends Omit<MyBookmark, 'content'> {
  content: MyContentItem[];
}

export const useMyTalkPickBookmarksQuery = (
  options?: Parameters<
    typeof useInfiniteScroll<
      MyBookmark,
      InfiniteData<MyBookmarkTransformedPage>
    >
  >[3],
) => {
  return useInfiniteScroll<MyBookmark, InfiniteData<MyBookmarkTransformedPage>>(
    ['myBookmarks'] as const,
    async ({ pageParam = 0 }) => getMyBookmark(pageParam, 20),
    (infiniteData: InfiniteData<MyBookmark>) => {
      const newPages = infiniteData.pages.map((page) => ({
        ...page,
        content: page.content.map((item) => transformBookmarkItem(item)),
      }));
      return {
        ...infiniteData,
        pages: newPages,
      };
    },
    options,
  );
};
