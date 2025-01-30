import React from 'react';
import { useMyGameBookmarksQuery } from '@/hooks/api/mypages/useMyGameBookmarksQuery';
import { useBalanceGameBookmark } from '@/hooks/mypages/useBalanceGameBookmark';
import InfiniteBalanceGameList from '@/components/organisms/InfiniteBalanceGameList/InfiniteBalanceGameList';

const BalanceGameBookmarks = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyGameBookmarksQuery();

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

export default BalanceGameBookmarks;
