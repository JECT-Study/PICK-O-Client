import React from 'react';
import { useMyBookmarksQuery } from '@/hooks/api/mypages/useMyBookmarksQuery';
import { useMyTalkPickBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkCreateMutation';
import { useMyTalkPickBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkDeleteMutation';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import useToastModal from '@/hooks/modal/useToastModal';
import { ERROR, SUCCESS } from '@/constants/message';
import { MyContentItem } from '@/types/mypages';
import { UseMutationOptions } from '@tanstack/react-query';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';

const TalkPickBookmarks = () => {
  const { data, isLoading } = useMyBookmarksQuery();
  const createBookmark = useMyTalkPickBookmarkCreateMutation();
  const deleteBookmark = useMyTalkPickBookmarkDeleteMutation();
  const { showToastModal } = useToastModal();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  const allContent = data?.pages.flatMap((page) => page.content) ?? [];

  const handleBookmarkClick = <TData, TError>(
    item: MyContentItem,
    mutate: (
      id: number,
      options?: UseMutationOptions<TData, TError, number, unknown>,
    ) => void,
  ) => {
    const { id, bookmarked } = item;

    if (bookmarked) {
      mutate(id, {
        onSuccess: () => showToastModal(SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS),
        onError: () => showToastModal(ERROR.BOOKMARK.DELETE_MUTATE_FAIL),
      });
    } else {
      mutate(id, {
        onSuccess: () => showToastModal(SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS),
        onError: () => showToastModal(ERROR.BOOKMARK.POST_MUTATE_FAIL),
      });
    }
  };

  return (
    <MyContentList
      items={allContent}
      onBookmarkClick={(item) =>
        handleBookmarkClick(
          item,
          item.bookmarked ? deleteBookmark.mutate : createBookmark.mutate,
        )
      }
    />
  );
};

export default TalkPickBookmarks;
