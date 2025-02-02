import { postDoneGameBookmark } from '@/api/bookmarks';
import { useMyBalanceGameBookmarkMutation } from '@/hooks/api/bookmark/useMyBalanceGameBookmarkMutation';

export const useMyBalanceGameBookmarkCreateMutation = () => {
  return useMyBalanceGameBookmarkMutation(postDoneGameBookmark, true, [
    'gameBookmark',
    'gameVote',
  ]);
};
