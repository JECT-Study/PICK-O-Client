import React from 'react';
import { useMyGameBookmarksQuery } from '@/hooks/api/mypages/useMyGameBookmarksQuery';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useBalanceGameBookmark } from '@/hooks/mypages/useBalanceGameBookmark';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';

const BalanceGameBookmarks = () => {
  const { data, isLoading } = useMyGameBookmarksQuery();
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
