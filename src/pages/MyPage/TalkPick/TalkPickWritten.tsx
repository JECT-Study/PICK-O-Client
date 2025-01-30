import React from 'react';
import { useMyWrittensQuery } from '@/hooks/api/mypages/useMyWrittensQuery';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';

const TalkPickWritten = () => {
  const { data, isLoading } = useMyWrittensQuery();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  if (!data) {
    return null;
  }

  return <MyContentList items={data.content} />;
};

export default TalkPickWritten;
