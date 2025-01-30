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

  return <InfoList items={data.content} />;
};

export default TalkPickComments;
