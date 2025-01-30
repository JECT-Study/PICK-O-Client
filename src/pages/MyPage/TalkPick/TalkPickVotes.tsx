import React from 'react';
import { useMyTalkPickVotesQuery } from '@/hooks/api/mypages/useMyTalkPickVotesQuery';
import InfoList from '@/components/organisms/InfoList/InfoList';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';

const TalkPickVotes = () => {
  const { data, isLoading } = useMyTalkPickVotesQuery();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  if (!data) {
    return null;
  }

  return <InfoList items={data.content} />;
};

export default TalkPickVotes;
