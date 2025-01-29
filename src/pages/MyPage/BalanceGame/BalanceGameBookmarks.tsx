import React from 'react';
import { useGameBookmarksQuery } from '@/hooks/api/mypages/useGameBookmarksQuery';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useBalanceGameBookmark } from '@/hooks/mypages/useBalanceGameBookmark';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';

const BalanceGameBookmarks = () => {
  const { data, isLoading } = useGameBookmarksQuery();
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

export default BalanceGameBookmarks;
