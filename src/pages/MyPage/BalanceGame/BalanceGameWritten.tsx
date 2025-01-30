import React from 'react';
import { useMyGameWrittensQuery } from '@/hooks/api/mypages/useMyGameWrittensQuery';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';

const BalanceGameWritten = () => {
  const { data, isLoading } = useMyGameWrittensQuery();

  if (isLoading) {
    return <MypageCardSkeleton />;
  }

  if (!data) {
    return null;
  }

  return <MyBalanceGameList items={data.content} />;
};

export default BalanceGameWritten;
