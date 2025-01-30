import React from 'react';
import { useMyTalkPickCommentsQuery } from '@/hooks/api/mypages/useMyTalkPickCommentsQuery';
import InfoList from '@/components/organisms/InfoList/InfoList';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';

const TalkPickComments = () => {
  const { data, isLoading } = useMyTalkPickCommentsQuery();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  if (!data) {
    return null;
  }

  const allContent = data.pages.flatMap((page) => page.content);

  return <InfoList items={allContent} />;
};

export default TalkPickComments;
