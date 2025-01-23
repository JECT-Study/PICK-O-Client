import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { postDoneGameBookmark } from '@/api/bookmarks';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
import { MyContentItem } from '@/types/mypages';

export const useMyTalkPickBookmarkCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn: (gameId: number) => postDoneGameBookmark(gameId),

      onMutate: (gameId: number): BookmarkContext => {
        const prevMyBookmarks = queryClient.getQueryData<{
          content: MyContentItem[];
        }>(['myBookmarks']);

        if (prevMyBookmarks) {
          const updated = prevMyBookmarks.content.map((item) =>
            item.id === gameId ? { ...item, bookmarked: true } : item,
          );
          queryClient.setQueryData(['myBookmarks'], {
            ...prevMyBookmarks,
            content: updated,
          });
        }

        return {
          myBookmarks: prevMyBookmarks?.content,
        };
      },

      onError: (error, gameId, context) => {
        if (context?.myBookmarks) {
          queryClient.setQueryData(['myBookmarks'], {
            content: context.myBookmarks,
          });
        }
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
      },
    },
  );
};
