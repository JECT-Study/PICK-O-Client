import { getGameVote } from '@/api/mypages';
import { GameVote, MyBalanceGameItem } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformGameVoteItem } from '@/utils/transformBalanceGame';

type GameVoteTransformed = Omit<GameVote, 'content'> & {
  content: MyBalanceGameItem[];
};

export const useGameVotesQuery = (memberId: number) => {
  const {
    data: gameVotesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<GameVote, GameVoteTransformed>(
    ['gameVote'],
    async ({ pageParam = 0 }) => {
      return getGameVote(pageParam, 20);
    },
    (infiniteData: InfiniteData<GameVote>): GameVoteTransformed => {
      const firstPage = infiniteData.pages[0];

      return {
        ...firstPage,
        content: infiniteData.pages.flatMap((page) =>
          page.content.map((item) => transformGameVoteItem(item, memberId)),
        ),
      };
    },
  );

  return {
    gameVote: gameVotesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
