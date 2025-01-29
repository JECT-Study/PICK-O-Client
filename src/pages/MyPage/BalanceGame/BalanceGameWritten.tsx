import React from 'react';
import { useGameWrittensQuery } from '@/hooks/api/mypages/useGameWrittensQuery';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';

const BalanceGameWritten = () => {
  const { data, isLoading } = useGameWrittensQuery();

  if (isLoading) {
    return <MypageCardSkeleton />;
  }

  if (!data) {
    return null;
  }

  return <MyBalanceGameList items={data.content} />;
};

export default BalanceGameWritten;
