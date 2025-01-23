import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { postTalkPickBookmark } from '@/api/bookmarks';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
import { MyContentItem } from '@/types/mypages';

export const useMyTalkPickBookmarkCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn: (talkPickId: number) => postTalkPickBookmark(talkPickId),

      onMutate: (talkPickId: number): BookmarkContext => {
        const prevMyBookmarks = queryClient.getQueryData<{
          content: MyContentItem[];
        }>(['myBookmarks']);

        if (prevMyBookmarks) {
          const updated = prevMyBookmarks.content.map((item) =>
            item.id === talkPickId ? { ...item, bookmarked: true } : item,
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
