import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { postDoneGameBookmark } from '@/api/bookmarks';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';

export const useCreateBookmarkMutation = () => {
  return useMutation<
    AxiosResponse<ServerResponse>,
    Error,
    number,
    BookmarkContext
  >({
    mutationFn: (gameId: Id) => postDoneGameBookmark(gameId),
  });
};
