import { useMutation } from '@tanstack/react-query';
import { postDoneGameBookmark } from '@/api/bookmarks';
import { Id } from '@/types/api';

export const useCreateBookmarkMutation = () => {
  return useMutation({
    mutationFn: async (gameSetId: Id) => {
      return postDoneGameBookmark(gameSetId);
    },
  });
};
