import React from 'react';
import { useMyGameWrittensQuery } from '@/hooks/api/mypages/useMyGameWrittensQuery';
import InfiniteBalanceGameList from '@/components/organisms/InfiniteBalanceGameList/InfiniteBalanceGameList';

const BalanceGameWritten = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyGameWrittensQuery();

  return (
    <InfiniteBalanceGameList
      data={data}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default BalanceGameWritten;
