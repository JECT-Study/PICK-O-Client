import { useMutation } from '@tanstack/react-query';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { Id } from '@/types/api';

export const useDeleteBookmarkMutation = () => {
  return useMutation({
    mutationFn: async (gameSetId: Id) => {
      return deleteDoneGameBookmark(gameSetId);
    },
  });
};
