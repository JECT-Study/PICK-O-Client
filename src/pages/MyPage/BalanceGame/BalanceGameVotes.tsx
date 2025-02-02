import React from 'react';
import { useMyGameVotesQuery } from '@/hooks/api/mypages/useMyGameVotesQuery';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useBalanceGameBookmark } from '@/hooks/mypages/useBalanceGameBookmark';
import InfiniteBalanceGameList from '@/components/organisms/InfiniteBalanceGameList/InfiniteBalanceGameList';

const BalanceGameVotes = () => {
  const { member } = useMemberQuery();
  const currentUserId = member?.id ?? 0;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyGameVotesQuery(currentUserId);
  const { handleBookmarkClick } = useBalanceGameBookmark();

  return (
    <InfiniteBalanceGameList
      data={data}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      onBookmarkClick={handleBookmarkClick}
    />
  );
};

export default BalanceGameVotes;
