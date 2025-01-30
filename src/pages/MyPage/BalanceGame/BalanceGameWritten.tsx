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

  const allContent = data.pages.flatMap((page) => page.content);

  return <MyBalanceGameList items={allContent} />;
};

export default BalanceGameWritten;
