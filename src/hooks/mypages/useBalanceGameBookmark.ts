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

  const showSuccessToast = (operation: 'create' | 'delete') => {
    const message =
      operation === 'create'
        ? SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS
        : SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS;
    dispatch(showToast({ message }));
  };

  const showErrorToast = (operation: 'create' | 'delete') => {
    const message =
      operation === 'create'
        ? ERROR.BOOKMARK.POST_MUTATE_FAIL
        : ERROR.BOOKMARK.DELETE_MUTATE_FAIL;
    dispatch(showToast({ message }));
  };

  const handleBookmarkClick = (item: MyBalanceGameItem) => {
    const { gameSetId, bookmarked } = item;

    if (bookmarked) {
      deleteBookmark.mutate(gameSetId, {
        onSuccess: () => showSuccessToast('delete'),
        onError: () => showErrorToast('delete'),
      });
    } else {
      createBookmark.mutate(gameSetId, {
        onSuccess: () => showSuccessToast('create'),
        onError: () => showErrorToast('create'),
      });
    }
  };

  return {
    handleBookmarkClick,
  };
};
