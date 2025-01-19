import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';

export const useDeleteBookmarkMutation = () => {
  return useMutation<
    AxiosResponse<ServerResponse>,
    Error,
    number,
    BookmarkContext
  >({
    mutationFn: (gameId: Id) => deleteDoneGameBookmark(gameId),
  });
};
