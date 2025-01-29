import React from 'react';
import { useMyVotesQuery } from '@/hooks/api/mypages/useMyVotesQuery';
import InfoList from '@/components/organisms/InfoList/InfoList';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';

const TalkPickVotes = () => {
  const { data, isLoading } = useMyVotesQuery();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  if (!data) {
    return null;
  }

  return <InfoList items={data.content} />;
};

export default TalkPickVotes;
