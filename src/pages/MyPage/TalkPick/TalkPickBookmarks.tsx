import React from 'react';
import { useMyTalkPickBookmarksQuery } from '@/hooks/api/mypages/useMyTalkPickBookmarksQuery';
import { useMyTalkPickBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkCreateMutation';
import { useMyTalkPickBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkDeleteMutation';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import { ERROR, SUCCESS } from '@/constants/message';
import { MyContentItem } from '@/types/mypages';
import { UseMutationOptions } from '@tanstack/react-query';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';
import { useDispatch } from 'react-redux';
import { showToast } from '@/store/slice/toastSlice';
import InfiniteTalkPickList from '@/components/organisms/InfiniteTalkPickList/InfiniteTalkPickList';

const TalkPickBookmarks = () => {
  const dispatch = useDispatch();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyTalkPickBookmarksQuery();
  const createBookmark = useMyTalkPickBookmarkCreateMutation();
  const deleteBookmark = useMyTalkPickBookmarkDeleteMutation();

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

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
        onSuccess: () => {
          dispatch(
            showToast({
              message: SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS,
            }),
          );
        },
        onError: () => {
          dispatch(
            showToast({
              message: ERROR.BOOKMARK.DELETE_MUTATE_FAIL,
            }),
          );
        },
      });
    } else {
      mutate(id, {
        onSuccess: () => {
          dispatch(
            showToast({
              message: SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS,
            }),
          );
        },
        onError: () => {
          dispatch(
            showToast({
              message: ERROR.BOOKMARK.POST_MUTATE_FAIL,
            }),
          );
        },
      });
    }
  };

  const renderMyContentList = (items: MyContentItem[]) => {
    return (
      <MyContentList
        items={items}
        onBookmarkClick={(item) =>
          handleBookmarkClick(
            item,
            item.bookmarked ? deleteBookmark.mutate : createBookmark.mutate,
          )
        }
      />
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
