import { useMyBalanceGameBookmarkCreateMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkCreateMutation';
import { useMyBalanceGameBookmarkDeleteMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkDeleteMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import { ERROR, SUCCESS } from '@/constants/message';
import { MyBalanceGameItem } from '@/types/mypages';

export const useBalanceGameBookmark = () => {
  const { showToastModal } = useToastModal();

  const createBookmark = useMyBalanceGameBookmarkCreateMutation();
  const deleteBookmark = useMyBalanceGameBookmarkDeleteMutation();

  const handleBookmarkClick = (item: MyBalanceGameItem) => {
    const { gameSetId, bookmarked } = item;

    if (bookmarked) {
      deleteBookmark.mutate(gameSetId, {
        onSuccess: () => showToastModal(SUCCESS.BOOKMARK.DELETE_MUTATE_SUCCESS),
        onError: () => showToastModal(ERROR.BOOKMARK.DELETE_MUTATE_FAIL),
      });
    } else {
      createBookmark.mutate(gameSetId, {
        onSuccess: () => showToastModal(SUCCESS.BOOKMARK.POST_MUTATE_SUCCESS),
        onError: () => showToastModal(ERROR.BOOKMARK.POST_MUTATE_FAIL),
      });
    }
  };

  return {
    handleBookmarkClick,
  };
};
