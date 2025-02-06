import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ServerResponse, Id } from '@/types/api';
import { MyBookmarkTransformedPage } from '@/hooks/api/mypages/useMyTalkPickBookmarksQuery';

type TalkPickBookmarkInfinite = InfiniteData<MyBookmarkTransformedPage>;

type TalkPickBookmarkContext = TalkPickBookmarkInfinite | undefined;

export const useMyTalkPickBookmarkMutation = (
  mutationFn: (id: Id) => Promise<AxiosResponse<ServerResponse>>,
  nextBookmarkedValue: boolean,
  shouldInvalidate: boolean,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ServerResponse>,
    Error,
    number,
    TalkPickBookmarkContext
  >({
    mutationFn,

    onMutate: async (talkPickId) => {
      await queryClient.cancelQueries({ queryKey: ['myBookmarks'] });

      const previousData = queryClient.getQueryData<TalkPickBookmarkInfinite>([
        'myBookmarks',
      ]);

      if (previousData) {
        const newPages = previousData.pages.map((page) => ({
          ...page,
          content: page.content.map((item) =>
            item.id === talkPickId
              ? { ...item, bookmarked: nextBookmarkedValue }
              : item,
          ),
        }));

        queryClient.setQueryData<TalkPickBookmarkInfinite>(['myBookmarks'], {
          ...previousData,
          pages: newPages,
        });
      }
      return previousData;
    },

    onError: (_error, talkPickId, context) => {
      if (context) {
        queryClient.setQueryData(['myBookmarks'], context);
      }
    },

    onSuccess: async () => {
      if (shouldInvalidate) {
        await queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
      }
    },
  });
};
