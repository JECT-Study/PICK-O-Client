import { getMyVote } from '@/api/mypages';
import { InfoItem, MyVote } from '@/types/mypages';
import { useInfiniteScroll } from '@/hooks/api/mypages/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { transformVoteItem } from '@/utils/transformTalkPick';

export interface MyVoteTransformedPage extends Omit<MyVote, 'content'> {
  content: InfoItem[];
}

export const useMyTalkPickVotesQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll<MyVote, InfiniteData<MyVoteTransformedPage>>(
      ['myVote'],
      async ({ pageParam = 0 }) => {
        return getMyVote(pageParam, 20);
      },
      (infiniteData) => {
        const newPages = infiniteData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) => transformVoteItem(item)),
        }));

        const newInfiniteData: InfiniteData<MyVoteTransformedPage> = {
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
