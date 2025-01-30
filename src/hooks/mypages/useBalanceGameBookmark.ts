import { useMyBalanceGameBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkCreateMutation';
import { useMyBalanceGameBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkDeleteMutation';
import { ERROR, SUCCESS } from '@/constants/message';
import { MyBalanceGameItem } from '@/types/mypages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { showToast } from '@/store/slice/toastSlice';

export const useBalanceGameBookmark = () => {
  const dispatch = useDispatch<AppDispatch>();

  const createBookmark = useMyBalanceGameBookmarkCreateMutation();
  const deleteBookmark = useMyBalanceGameBookmarkDeleteMutation();

  const handleBookmarkClick = (item: MyBalanceGameItem) => {
    const { gameSetId, bookmarked } = item;

    if (bookmarked) {
      deleteBookmark.mutate(gameSetId, {
        onSuccess: () =>
          dispatch(
            showToast({ message: SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS }),
          ),
        onError: () =>
          dispatch(showToast({ message: ERROR.BOOKMARK.DELETE_MUTATE_FAIL })),
      });
    } else {
      createBookmark.mutate(gameSetId, {
        onSuccess: () =>
          dispatch(
            showToast({ message: SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS }),
          ),
        onError: () =>
          dispatch(showToast({ message: ERROR.BOOKMARK.POST_MUTATE_FAIL })),
      });
    }
  };

  return {
    handleBookmarkClick,
  };
};
