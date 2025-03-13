import { getGameVote } from '@/api/mypages';
import { GameVote, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformGameVoteItem } from '@/utils/transformBalanceGame';

export interface GameVoteTransformedPage extends Omit<GameVote, 'content'> {
  content: MyBalanceGameItem[];
}

export const useMyGameVotesQuery = (
  memberId: number,
  options?: Parameters<
    typeof useInfiniteScroll<GameVote, InfiniteData<GameVoteTransformedPage>>
  >[3],
) => {
  return useInfiniteScroll<GameVote, InfiniteData<GameVoteTransformedPage>>(
    ['gameVote'] as const,
    async ({ pageParam = 0 }) => getGameVote(pageParam, 20),
    (infiniteData: InfiniteData<GameVote>) => {
      const newPages = infiniteData.pages.map((page) => ({
        ...page,
        content: page.content.map((item) =>
          transformGameVoteItem(item, memberId),
        ),
      }));
      return {
        ...infiniteData,
        pages: newPages,
      };
    },
    options,
  );
};
