import { postTalkPickBookmark } from '@/api/bookmarks';
import { useMyTalkPickBookmarkMutation } from '@/hooks/api/bookmark/useMyTalkPickBookmarkMutation';

export const useMyTalkPickBookmarkCreateMutation = () => {
  return useMyTalkPickBookmarkMutation(postTalkPickBookmark, true, true);
};
