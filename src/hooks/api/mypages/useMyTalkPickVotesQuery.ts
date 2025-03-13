import { getMyVote } from '@/api/mypages';
import { InfoItem, MyVote } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformVoteItem } from '@/utils/transformTalkPick';

export interface MyVoteTransformedPage extends Omit<MyVote, 'content'> {
  content: InfoItem[];
}

export const useMyTalkPickVotesQuery = (
  options?: Parameters<
    typeof useInfiniteScroll<MyVote, InfiniteData<MyVoteTransformedPage>>
  >[3],
) => {
  return useInfiniteScroll<MyVote, InfiniteData<MyVoteTransformedPage>>(
    ['myVote'] as const,
    async ({ pageParam = 0 }) => {
      return getMyVote(pageParam, 20);
    },
    (infiniteData: InfiniteData<MyVote>) => {
      const newPages = infiniteData.pages.map((page) => ({
        ...page,
        content: page.content.map((item) => transformVoteItem(item)),
      }));
      return {
        ...infiniteData,
        pages: newPages,
      };
    },
    options,
  );
};
