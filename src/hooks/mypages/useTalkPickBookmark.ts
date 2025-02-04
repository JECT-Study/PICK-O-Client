import { useMyTalkPickBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkCreateMutation';
import { useMyTalkPickBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkDeleteMutation';
import { ERROR, SUCCESS } from '@/constants/message';
import { MyContentItem } from '@/types/mypages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { showToast } from '@/store/slice/toastSlice';

export const useTalkPickBookmark = () => {
  const dispatch = useDispatch<AppDispatch>();

  const createBookmark = useMyTalkPickBookmarkCreateMutation();
  const deleteBookmark = useMyTalkPickBookmarkDeleteMutation();

  const showSuccessToast = (message: string) => {
    dispatch(showToast({ message }));
  };

  const showErrorToast = (message: string) => {
    dispatch(showToast({ message }));
  };

  const handleBookmarkClick = (item: MyContentItem) => {
    const { id, bookmarked } = item;

    if (bookmarked) {
      deleteBookmark.mutate(id, {
        onSuccess: () =>
          showSuccessToast(SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS),
        onError: () => showErrorToast(ERROR.BOOKMARK.DELETE_MUTATE_FAIL),
      });
    } else {
      createBookmark.mutate(id, {
        onSuccess: () => showSuccessToast(SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS),
        onError: () => showErrorToast(ERROR.BOOKMARK.POST_MUTATE_FAIL),
      });
    }
  };

  return {
    handleBookmarkClick,
  };
};
