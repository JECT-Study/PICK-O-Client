import React from 'react';
import { useMyTalkPickWrittensQuery } from '@/hooks/api/mypages/useMyTalkPickWrittensQuery';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';

const TalkPickWritten = () => {
  const { data, isLoading } = useMyTalkPickWrittensQuery();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  if (!data) {
    return null;
  }

  const allContent = data.pages.flatMap((page) => page.content);

  return <MyContentList items={allContent} />;
};

export default TalkPickWritten;
