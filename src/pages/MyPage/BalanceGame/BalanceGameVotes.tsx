import React from 'react';
import { useGameVotesQuery } from '@/hooks/api/mypages/useGameVotesQuery';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useBalanceGameBookmark } from '@/hooks/mypages/useBalanceGameBookmark';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';

const BalanceGameVotes = () => {
  const { member } = useMemberQuery();
  const currentUserId = member?.id ?? 0;
  const { data, isLoading } = useGameVotesQuery(currentUserId);
  const { handleBookmarkClick } = useBalanceGameBookmark();

  if (isLoading) {
    return <MypageCardSkeleton />;
  }

  if (!data) {
    return null;
  }

  const allContent = data.pages.flatMap((page) => page.content);

  return (
    <MyBalanceGameList
      items={allContent}
      onBookmarkClick={handleBookmarkClick}
    />
  );
};

export default BalanceGameVotes;
