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

  const allContent = data.pages.flatMap((page) => page.content);

  return <InfoList items={allContent} />;
};

export default TalkPickVotes;
