import { deleteTalkPickBookmark } from '@/api/bookmarks';
import { useMyTalkPickBookmarkMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkMutation';

export const useMyTalkPickBookmarkDeleteMutation = () => {
  return useMyTalkPickBookmarkMutation(deleteTalkPickBookmark, false, false);
};
