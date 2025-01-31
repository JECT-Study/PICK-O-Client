import React from 'react';
import { useMyTalkPickBookmarksQuery } from '@/hooks/api/mypages/useMyTalkPickBookmarksQuery';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import { MyContentItem } from '@/types/mypages';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';
import InfiniteTalkPickList from '@/components/organisms/InfiniteTalkPickList/InfiniteTalkPickList';
import { useTalkPickBookmark } from '@/hooks/mypages/useTalkPickBookmark';

const TalkPickBookmarks = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyTalkPickBookmarksQuery();
  const { handleBookmarkClick } = useTalkPickBookmark();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  const renderMyContentList = (items: MyContentItem[]) => {
    return (
      <MyContentList items={items} onBookmarkClick={handleBookmarkClick} />
    );
  };

  return (
    <InfiniteTalkPickList
      data={data}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      renderList={renderMyContentList}
    />
  );
};

export default TalkPickBookmarks;
