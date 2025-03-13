import { getMyComment } from '@/api/mypages';
import { MyComment, InfoItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { transformCommentItem } from '@/utils/transformTalkPick';
import { InfiniteData } from '@tanstack/react-query';

export interface MyCommentTransformedPage extends Omit<MyComment, 'content'> {
  content: InfoItem[];
}

export const useMyTalkPickCommentsQuery = (
  options?: Parameters<
    typeof useInfiniteScroll<MyComment, InfiniteData<MyCommentTransformedPage>>
  >[3],
) => {
  return useInfiniteScroll<MyComment, InfiniteData<MyCommentTransformedPage>>(
    ['myComments'] as const,
    async ({ pageParam = 0 }) => getMyComment(pageParam, 20),
    (infiniteData: InfiniteData<MyComment>) => {
      const newPages = infiniteData.pages.map((page) => ({
        ...page,
        content: page.content.map((item) => transformCommentItem(item)),
      }));
      return {
        ...infiniteData,
        pages: newPages,
      };
    },
    options,
  );
};
