import { getMyComment } from '@/api/mypages';
import { MyComment, InfoItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { transformCommentItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

export interface MyCommentTransformedPage extends Omit<MyComment, 'content'> {
  content: InfoItem[];
}

export const useMyTalkPickCommentsQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<MyComment, InfiniteData<MyCommentTransformedPage>>(
      ['myComments'],
      async ({ pageParam = 0 }) => {
        return getMyComment(pageParam, 20);
      },
      (infiniteData) => {
        const newPages = infiniteData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) => transformCommentItem(item)),
        }));

        const newInfiniteData: InfiniteData<MyCommentTransformedPage> = {
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
