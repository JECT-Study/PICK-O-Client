import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { getMyBookmark } from '@/api/mypages';
import { MyBookmark, MyContentItem } from '@/types/mypages';
import { transformBookmarkItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

type MyBookmarkTransformed = Omit<MyBookmark, 'content'> & {
  content: MyContentItem[];
};

export const useMyBookmarksQuery = () => {
  const {
    data: myBookmarksData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<MyBookmark, MyBookmarkTransformed>(
    ['myBookmarks'],

    async ({ pageParam = 0 }) => {
      return getMyBookmark(pageParam, 20);
    },

    (infiniteData: InfiniteData<MyBookmark>): MyBookmarkTransformed => {
      const firstPage = infiniteData.pages[0];

      return {
        ...firstPage,
        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformBookmarkItem(item)),
        ),
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
