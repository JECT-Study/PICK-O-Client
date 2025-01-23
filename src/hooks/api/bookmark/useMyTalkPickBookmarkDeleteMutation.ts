import { Id, ServerResponse } from '@/types/api';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkContext } from '@/types/bookmarks';
import { deleteTalkPickBookmark } from '@/api/bookmarks';
import { MyContentItem } from '@/types/mypages';

export const useMyTalkPickBookmarkDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn: (talkPickId: number) => deleteTalkPickBookmark(talkPickId),

      onMutate: (talkPickId: number): BookmarkContext => {
        const prevMyBookmarks = queryClient.getQueryData<{
          content: MyContentItem[];
        }>(['myBookmarks']);

        if (prevMyBookmarks) {
          const updated = prevMyBookmarks.content.map((item) =>
            item.id === talkPickId ? { ...item, bookmarked: false } : item,
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

      onError: (error, talkPickId, context) => {
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
