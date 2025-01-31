import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { useMyBalanceGameBookmarkMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkMutation';

export const useMyBalanceGameBookmarkDeleteMutation = () => {
  return useMyBalanceGameBookmarkMutation(deleteDoneGameBookmark, false, [
    'gameVote',
  ]);
};
